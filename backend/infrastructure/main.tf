# resource "aws_api_gateway_rest_api" "api" {
#   name = var.app_name
#   body = "api.yml"
# }

data "aws_caller_identity" "current" {}

module "bucket" {
  source = "./@modules/s3"
  env = var.env
  account_id = data.aws_caller_identity.current.account_id
  region = var.region
  app_name = var.app_name
  bucket = var.bucket
}

module "api" {
  source = "./@modules/apigateway"
  env = var.env
  account_id = data.aws_caller_identity.current.account_id
  region = var.region
  app_name = var.app_name
}

module "lambdas" {
  source = "./@modules/lambda-endpoints"
  env = var.env
  account_id = data.aws_caller_identity.current.account_id
  region = var.region
  app_name = var.app_name
  bucket = var.bucket
}

