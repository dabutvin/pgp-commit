const git = require('nodegit')
const openpgp = require('openpgp')

const fs = require('fs')

async function sign(message, privateKey, passphrase) {
  const repo = await git.Clone(
    'https://github.com/dabutvin/deepstream',
    '/private/tmp/test'
  )

  fs.writeFileSync('/private/tmp/test/nothing', 'data')
  const index = await repo.refreshIndex()
  await index.addAll()
  await index.write()
  const oid = await index.writeTreeTo(repo)
  const branch = await repo.getBranch('HEAD')
  const head = await git.Reference.nameToId(repo, 'HEAD')
  const parent = await repo.getCommit(head)
  const author = git.Signature.now('test', 'test@test.com')
  const committer = git.Signature.now('test', 'test@test.com')
  const commit = await repo.createCommitWithSignature(
    author,
    committer,
    message,
    oid,
    [parent],
    'gpgsig',
    onSignature
  )

  await branch.setTarget(commit.toString(), 'updating head')
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
