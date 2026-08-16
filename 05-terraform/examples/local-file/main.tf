resource "local_file" "hello" {
  filename        = var.filename
  content         = var.greeting
  file_permission = "0644"
}
