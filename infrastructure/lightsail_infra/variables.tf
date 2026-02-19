variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "repo_url" {
  description = "HTTPS URL of the git repository to clone on the instance"
  type        = string
  default     = "https://github.com/danjer/frog-art"
}

variable "branch" {
  description = "Git branch to deploy"
  type        = string
  default     = "main"
}
