const git = require('nodegit')
const openpgp = require('openpgp')

async function sign(message, privateKey, passphrase) {
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
