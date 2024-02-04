terraform {
  backend "s3" {
    bucket = "flashare-tfstate-prod"
    dynamodb_table = "flashare-tfstate-lock"
    encrypt = true
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}