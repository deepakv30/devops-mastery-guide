module "hello" {
  source   = "./modules/hello"
  filename = "${path.module}/hello-from-module.txt"
  content  = "created by a module\n"
}

module "named" {
  source   = "./modules/hello"
  for_each = toset(["alpha", "beta"])

  filename = "${path.module}/${each.key}.txt"
  content  = "hello ${each.key}\n"
}
