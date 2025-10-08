terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "us-east-1" # or your preferred region
}

resource "aws_lightsail_instance" "prototype" {
  name              = "docker-prototype"
  availability_zone = "us-east-1a"
  blueprint_id      = "amazon_linux_2" # base image
  bundle_id         = "nano_2_0"       # cheapest plan (~$5/month)
  user_data         = file("user_data.sh")
}

resource "aws_lightsail_static_ip" "prototype_ip" {
  name = "prototype-ip"
}

resource "aws_lightsail_static_ip_attachment" "prototype_ip_attach" {
  static_ip_name = aws_lightsail_static_ip.prototype_ip.name
  instance_name  = aws_lightsail_instance.prototype.name
}

output "public_ip" {
  value = aws_lightsail_static_ip.prototype_ip.ip_address
}