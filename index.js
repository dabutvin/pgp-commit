const git = require('nodegit')
const openpgp = require('openpgp')

async function sign({
  repo,
  author,
  committer,
  commitMessage,
  privateKey,
  passphrase
}) {
  const index = await repo.refreshIndex()
  const oid = await index.writeTreeTo(repo)
  const head = await git.Reference.nameToId(repo, 'HEAD')
  const parent = await repo.getCommit(head)
  const commit = await repo.createCommitWithSignature(
    'HEAD',
    author,
    committer,
    commitMessage,
    oid,
    [parent],
    'gpgsig',
    onSignature
  )
  return commit.toString()

  async function onSignature(tosign) {
    const privateKeyResult = (await openpgp.key.readArmored(privateKey)).keys[0]
    if (!privateKeyResult) throw new Error('unable to read private key')
    await privateKeyResult.decrypt(passphrase)

    // use binary to preserve line-endings to make signatures match
    const buf = new Uint8Array(tosign.length)
    for (let i = 0; i < tosign.length; i++) {
      buf[i] = tosign.charCodeAt(i)
    }

    const options = {
      message: openpgp.message.fromBinary(buf),
      privateKeys: [privateKeyResult],
      detached: true
    }
    const signed = await openpgp.sign(options)
    const signature = signed.signature
    return signature
  }
}

module.exports = sign
