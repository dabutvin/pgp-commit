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
  const currentBranch = await repo.getBranch('HEAD')
  const head = await git.Reference.nameToId(repo, 'HEAD')
  const parent = await repo.getCommit(head)
  const commit = await repo.createCommitWithSignature(
    author,
    committer,
    commitMessage,
    oid,
    [parent],
    'gpgsig',
    onSignature
  )
  await currentBranch.setTarget(commit.toString(), 'updating head')
  return commit.toString()

  async function onSignature(tosign) {
    const privateKeyResult = (await openpgp.key.readArmored(privateKey)).keys[0]
    if (!privateKeyResult) throw new Error('unable to read private key')
    await privateKeyResult.decrypt(passphrase)
    const options = {
      message: openpgp.cleartext.fromText(tosign),
      privateKeys: [privateKeyResult],
      detached: true
    }
    const signed = await openpgp.sign(options)
    const signature = signed.signature.replace(/\r\n/g, '\n')
    return signature
  }
}

module.exports = sign
