terraform {
  backend "s3" {
    bucket = "flashare-tfstate-dev" # CONFIG: Replace, Must be globally unique
    dynamodb_table = "flashare-tfstate-lock"
  }
}