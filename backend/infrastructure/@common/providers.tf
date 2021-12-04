terraform {
  backend "s3" {
    encrypt = true
    region = "us-east-1" # CONFIG: Replace, if you want it located elsewhere
  }
  required_version = "1.0.4"
}

provider "aws" {
  region = "us-east-1"
}