const git = require('nodegit')
const openpgp = require('openpgp')

const fs = require('fs')

async function sign(message, privateKey, passphrase) {
  const repo = await git.Clone(
    'https://github.com/dabutvin/test',
    '/private/tmp/test'
  )

  fs.writeFileSync('/private/tmp/test/nothing', 'data')
  const index = await repo.refreshIndex()
  await index.addAll()
  await index.write()
  const oid = await index.writeTree()
  const head = await git.Reference.nameToId(repo, 'HEAD')
  const parent = await repo.getCommit(head)
  const author = git.Signature.now('test', 'test@test.com')
  const committer = git.Signature.now('test', 'test@test.com')
  const commitId = await repo.createCommit(
    'HEAD',
    author,
    committer,
    'message',
    oid,
    [parent]
  )

  const privateKeyResult = (await openpgp.key.readArmored(privateKey)).keys[0]
  if (!privateKeyResult) throw new Error('unable to read private key')
  await privateKeyResult.decrypt(passphrase)
  const options = {
    message: openpgp.cleartext.fromText(message),
    privateKeys: [privateKeyResult],
    detached: true
  }
  const signed = await openpgp.sign(options)
  const signature = signed.signature.replace(/\r\n/g, '\n')
  return signature
}

module.exports = sign
