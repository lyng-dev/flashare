terraform {
  backend "s3" {
    bucket = "flashare-tfstate-dev" # CONFIG: Replace, Must be globally unique
                                    # CONFIG: Must be created manually
                                    # CONFIG: Create using ./setup-prepare-aws.sh
    dynamodb_table = "flashare-tfstate-lock" # CONFIG: Must be created manually
                                             # CONFIG: Create using ./setup-prepare-aws.sh
    key = "flashare/tfstate"
    encrypt = true
    region = "us-east-1" # CONFIG: Replace, if you want it located elsewhere
  }
}