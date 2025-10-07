# Frogs & art

## Infrastructure

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




