terraform{
  # Store state in S3 so it is shared
  backend "s3" {
    bucket = "frog-art-terraform"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_lightsail_instance" "frog-art-api" {
  name              = "frog-art-api"
  availability_zone = "us-east-1a"
  blueprint_id      = "amazon_linux_2" 
  bundle_id         = "medium_3_0"
  user_data         = file("setup.sh")
}

resource "aws_lightsail_static_ip" "frog-art-api_ip" {
  name = "frog-art-api-ip"
}

resource "aws_lightsail_static_ip_attachment" "frog-art-api_ip_attach" {
  static_ip_name = aws_lightsail_static_ip.frog-art-api_ip.name
  instance_name  = aws_lightsail_instance.frog-art-api.name
}

output "public_ip" {
  value = aws_lightsail_static_ip.frog-art-api_ip.ip_address
}