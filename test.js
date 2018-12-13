const test = require('tape')
const pgpCommit = require('.')

test('signs commits', async t => {
  let signature = await pgpCommit(
    'message',
    sample_private_key,
    sample_password
  )
  t.equal(signature, sample_signature)
  t.end()
})

const sample_private_key = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: BCPG C# v1.6.1.0

lQOsBFwSkAQBCACBfC6sDgn9A1Hv3y279+YNlqOeETB7zFw5flCAKWlw3osUSnft
F+EdgTqH/sVxrxXaqfRpWNDHYD/WG/etSYiP8oaTsM9jWlH3gRQnXm/W1asku2fZ
nVFJU0kJUWmwSHBVX/5/0qGCohIshMxuQXr73zYdoOj5G7Sdwzr7saoi8h//QK7G
xbq8TZzLsPHELXhL9NKC7RGRi6ig1Jx6xHxu3Zx0ICtZCKshGtTsgMCKi7DYfRWj
IbteGltrA6aMKWDjn68waxQXidkfwAS5mC5g04V1CaYKEgyefmlaZGJ4GQqjYGId
g40K5koZJdjGYDQGms1SajguMn1lzwzuAhhdABEBAAH/AwMC57O2AZ40siBgwrbS
lX8323pjaX5ke16EOb8lcaV0HK9lDVQ4iOoLq4QbyLRRexBVCQ/dxYbp9/Yc1R3h
L/A7aBVykdG15tbQXg3DoTcvKvzkL0bW51NavxpXItmW4RAyWsZ3rlD9ADcceaex
cysr6A2lZ4Ao+7wBG+rHc+1ZukZmofPvgu96tTP9ajjcAbKhvLgMAq/WZP34THo6
aRPjLb8bWEbyc23HKF+5FjGOyWs85CBq+vR7ufeEHXKuc7mE2Vjut0VOjQW2nYYF
4DpQMC+5GqhzxoxQeVvVdNEwX9NK8F9pHT4KeFPVsySiJfOEmzNYskXpvgJmCIXD
s8GTaDTO8SS1x/AYixElzWw44IXzBXDngxvBUGfAx7dD7LlhuxTFa39S0s00BspW
Z161WIFggFuycmraVyFIgreEDSCP2XlUQRD62cR/rEKPSpx/NaQTxVv1eiNXIpsl
+5aLaPfXMzurmajJp/Xg/N38B8LYBsZXuRqBhL/O6nV9HJUTQRLWohA581pdn822
hDbO0yP0hZsLqPltOHJ/Z064l+vAEkCehB6Wg4L1JH4RyB1HVvrSR0+oJ86AAOb2
W/PP6bQIK3OEfF6rOYpGNMzj4pHU7eeB2Kg7YOGovWZwRUo4/QHPegRIYfj61U/u
bXysn1SHhYcpxfPJ4ktrUcHqR7X+O677ATeqcoHGQGmNDtsp5jDljhExO3mv+ZxP
MTs5ooWWDKqqZnO32EC1PY3xYiG8vEZIl70TyzRn03EJifnMGh0anezHxXDEjdAh
pkzUvJFVXaeiUYrW+GIDzgDhXVOHS2SbXcn2mmhogECheKapJR8tqzG82xi53ute
hGykXkMtup58QpWGqermc0sNx1tI/Ks/rADrhVs/PbQNdGVzdEB0ZXN0LmNvbYkB
HAQQAQIABgUCXBKQBAAKCRAlukTGhICco/2fB/9UXBtu5V/SDtSS7zy9ie3PmjHZ
kSWJ24CXKv3pXZ/zqXiAamBuDT12stlYyaNY795s9I5+Sk0L+KGgjurWEBND/wBv
aiuXUWscRrinksGE5j8rjoA9iyIyA7oEEbuR3UK7S5LplDV8SpnsgyxkOIayhFCB
gW+4+W8TZlOh22U9eRAJkJm/THsvdtQNbuYgIPadKnfefMZZhRYBgrFysgbZFOxC
zxvH4ztzL+7+rVRqc/j5mNz2X6YOIlwXXhd7/nOJjFXnjsZ7hTRu3danit7/dl5F
s0IzD2i+KIfn2dH5wDqs0pPbvhJIWp/i3u4Q+kL4DxdNoqXog8+82qr5b6Is
=rqAt
-----END PGP PRIVATE KEY BLOCK-----`

const sample_password = 'testpassword'
