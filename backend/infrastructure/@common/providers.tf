terraform {
  backend "s3" {
    encrypt = true
    region = "us-east-1" # CONFIG: Replace, if you want it located elsewhere
  }
}

provider "aws" {
  profile = "flashare"
  region = "us-east-1"
}