output "hello_path" {
  description = "Path of the file Terraform created"
  value       = local_file.hello.filename
}

output "hello_id" {
  description = "Checksum of the file content, stored in state"
  value       = local_file.hello.id
}
