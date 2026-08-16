variable "greeting" {
  type        = string
  description = "Text written into the file"
  default     = "hello from terraform\n"
}

variable "filename" {
  type        = string
  description = "Path of the file to create, relative to this directory"
  default     = "hello.txt"
}
