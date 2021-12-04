module "api" {
  source = "../@modules/apigateway"
  env = var.env
  account_id = var.account_id
  region = var.region
  app_name = var.app_name
}

module "endpoints" {
  source = "../@modules/lambda-endpoints"
  env = var.env
  account_id = var.account_id
  region = var.region
  app_name = var.app_name
  bucket = var.bucket
}

module "s3" {
  source = "../@modules/s3"
  env = var.env
  account_id = var.account_id
  region = var.region
  app_name = var.app_name
  bucket = var.bucket
}