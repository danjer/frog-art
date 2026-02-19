terraform {
  backend "s3" {
    bucket = "frog-art-terraform"
    key    = "lightsail/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_lightsail_instance" "frog_art" {
  name              = "frog-art"
  availability_zone = "${var.aws_region}a"
  blueprint_id      = "amazon_linux_2023"
  bundle_id         = "medium_3_0"
  user_data         = templatefile("${path.module}/setup.sh", {
    repo_url = var.repo_url
    branch   = var.branch
  })
}

resource "aws_lightsail_instance_public_ports" "frog_art" {
  instance_name = aws_lightsail_instance.frog_art.name

  port_info {
    protocol  = "tcp"
    from_port = 22
    to_port   = 22
  }

  port_info {
    protocol  = "tcp"
    from_port = 80
    to_port   = 80
  }

  port_info {
    protocol  = "tcp"
    from_port = 443
    to_port   = 443
  }
}

resource "aws_lightsail_static_ip" "frog_art" {
  name = "frog-art-ip"
}

resource "aws_lightsail_static_ip_attachment" "frog_art" {
  static_ip_name = aws_lightsail_static_ip.frog_art.name
  instance_name  = aws_lightsail_instance.frog_art.name
}

output "public_ip" {
  value = aws_lightsail_static_ip.frog_art.ip_address
}

output "app_url" {
  value = "http://${aws_lightsail_static_ip.frog_art.ip_address}"
}
