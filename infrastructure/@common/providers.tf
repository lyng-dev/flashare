terraform {
  backend "s3" {
    encrypt = true
    key = "flashare"
    region = "us-east-1" # CONFIG: Replace, if you want it located elsewhere
  }
  required_version = "1.0.3"
}

provider "aws" {
  region = "us-east-1"
}