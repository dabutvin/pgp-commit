workflow "New workflow" {
  on = "push"
  resolves = ["NOTICE file generator"]
}

action "NOTICE file generator" {
  uses = "dabutvin/chive-action@1.0.1"
}
