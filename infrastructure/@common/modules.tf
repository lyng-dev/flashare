module "api" {
  source = "../@modules/apigateway"
  env = var.env
  account_id = var.account_id
  region = var.region
  app-name = var.app-name
}

module "endpoints" {
  source = "../@modules/lambda-endpoints"
  env = var.env
  account_id = var.account_id
  region = var.region
  app-name = var.app-name
}