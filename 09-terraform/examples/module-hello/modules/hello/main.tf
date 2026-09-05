resource "local_file" "this" {
  filename        = var.filename
  content         = var.content
  file_permission = "0644"
}
