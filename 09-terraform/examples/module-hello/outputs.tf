output "hello_path" {
  description = "File created by the single module call"
  value       = module.hello.path
}

output "named_paths" {
  description = "Files created by the for_each module calls"
  value       = { for name, inst in module.named : name => inst.path }
}
