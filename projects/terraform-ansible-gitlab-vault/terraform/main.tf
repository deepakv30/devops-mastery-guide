# Example Terraform configuration for provisioning VMs

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Example AMI
  instance_type = "t3.micro"

  tags = {
    Name = "devops-web-server"
    Environment = "dev"
  }
}

output "instance_public_ip" {
  value = aws_instance.web_server.public_ip
}

output "ansible_inventory" {
  value = aws_instance.web_server.public_ip
}
