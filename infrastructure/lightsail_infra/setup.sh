#!/bin/bash
set -e

# Install Docker and git (runs as root via cloud-init)
yum update -y
yum install -y docker git

# Enable and start Docker
systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user

# Install Docker Compose plugin (v2)
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Clone the repository
git clone --branch ${branch} ${repo_url} /opt/frog-art

# Start the full stack
cd /opt/frog-art
docker compose up -d --build
