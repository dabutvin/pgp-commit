# PGP Commit

Sign a commit with openpgp and nodegit

- https://github.com/nodegit/nodegit
- https://github.com/openpgpjs/openpgpjs

## Install

```
npm install pgp-commit
```

## Example

See more examples in examples folder

```js
const git = require("nodegit")
const pgpCommit = require("pgp-commit")

run()

async function run() {
  // clone a repo
  const repo = await git.Clone("https://github.com/owner/repo", "/temp/repo")
  const commitMessage = "add data to something"
  const author = git.Signature.now("test", "test@test.com")
  const committer = git.Signature.now("test", "test@test.com")

  // make a change
  fs.writeFileSync("/temp/repo/nothing", "nothing")

  // stage the change
  const index = await repo.refreshIndex()
  await index.addAll()
  await index.write()

  // make a signed commit
  const commitId = await pgpCommit({
    repo,
    commitMessage,
    author,
    committer,
    passphrase,
    privateKey
  })
}
```
