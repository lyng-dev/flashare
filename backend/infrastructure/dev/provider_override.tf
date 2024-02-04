terraform {
  backend "s3" {
    bucket = "flashare-tfstate-dev"
    dynamodb_table = "flashare-tfstate-lock"
    key = "flashare/tfstate"
    encrypt = true
    region = "us-east-1"
    profile = "flashare"
  }
}