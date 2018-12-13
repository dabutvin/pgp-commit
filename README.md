# PGP Commit

Sign a commit with openpgp and nodegit

- https://github.com/nodegit/nodegit
- https://github.com/openpgpjs/openpgpjs

```
npm install pgp-commit
```

```js
const git = require('nodegit')
const pgpCommit = require('pgp-commit')

run()

async function run() {
  const repo = await git.Clone('https://github.com/owner/repo', '/temp/repo')
  fs.writeFileSync('/temp/repo/nothing', 'nothing')
  const index = await repo.refreshIndex()
  await index.addAll()
  await index.write()
  const oid = await index.writeTree()
  const head = await git.Reference.nameToId(repo, 'HEAD')
  const parent = await repo.getCommit(head)
  const author = git.Signature.now('test', 'test@test.com')
  const committer = git.Signature.now('test', 'test@test.com')

  const commitId = await pgpCommit(
    'HEAD',
    author,
    committer,
    'commit message',
    oid,
    [parent]
  )
}
```
