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

  # environment variables
  BUCKET = var.BUCKET
}