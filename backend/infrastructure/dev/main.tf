module "deployment" {
  source = "../"
  app_name = var.app_name
  env = "dev"
  region = "us-east-1"
  bucket = "flashare-dev"
}