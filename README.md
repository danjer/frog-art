# Frogs & art

## Infrastructure

### ECS using fargate

To deploy frog-art-api, first make sure to setup the ECR repository by running:

```bash
terraform apply --target aws_ecr_repository.frog_art_api
```
Now, login to the ECR repository by running:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 026024574095.dkr.ecr.us-east-1.amazonaws.com
```

Build (in root) and tag image locally:
```bash
docker build -t public.ecr.aws/o0w5p0g4/frog-art-api:latest -f ./backend/Dockerfile .
docker push public.ecr.aws/o0w5p0g4/frog-art-api:latest
```

Push the image:
```bash
docker push public.ecr.aws/o0w5p0g4/frog-art-api/frog-art-api:latest
```

Now run terraform apply on the complete project
```bash
terraform apply
```

### Using docker-compose and on lightsail
Create provisioned lightsail instance using terraform:
```
terraform apply
```

Download the ssh key from console and use the public IP to sync project files
 ```
rsync -avz --delete -e "ssh -i lightsail-key.pem" \
--exclude ".venv" \
--exclude ".expo" \
--exclude "backend\.venv" \
--exclude "front-end" \
--exclude ".*" \
--exclude "infrastructure" \
--exclude "v2" \
--exclude "static" \
--exclude "lightsail-key.pem" \
. "ec2-user@35.170.119.210:/home/ec2-user/frog-art"
```

ssh into the instance
```
ssh -i lightsail-key.pem ec2user@public-ip
```

cd into the frog-art dir and start the docker-compose services
```
cd frog-art
docker-compose up
```

