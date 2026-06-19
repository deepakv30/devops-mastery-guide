output "vpc_id" {
  value = module.vpc.vpc_id
}

output "web_server_public_ip" {
  value = aws_instance.web_server.public_ip
}
