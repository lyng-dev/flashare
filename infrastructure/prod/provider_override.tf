terraform {
  backend "s3" {
    bucket = "flashare-tfstate-prod" # CONFIG: Replace, Must be globally unique
                                    # CONFIG: Must be created manually
                                    # CONFIG: Create using ./setup-prepare-aws.sh
    dynamodb_table = "flashare-tfstate-lock" # CONFIG: Must be created manually
                                             # CONFIG: Create using ./setup-prepare-aws.sh
    encrypt = true
    region = "us-east-1" # CONFIG: Replace, if you want it located elsewhere
  }
  required_version = "1.0.4"
}

provider "aws" {
  region = "us-east-1"
}