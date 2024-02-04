resource "aws_api_gateway_rest_api" "api" {
  name = "flashare-api-${var.env}"
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api.body))
  }
}

resource "aws_api_gateway_stage" "api" {
  deployment_id = aws_api_gateway_deployment.api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.env
}

resource "aws_api_gateway_resource" "secret_resource" {
  path_part   = "secret"
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

module "route_create_secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.secret_resource.id
  resource_path_part                  = "create"
  method_http_method                  = "POST"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app_name}-${var.env}-create-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
  function_name                       = "${var.app_name}-${var.env}-create-secret"
  execution_arn                       = aws_api_gateway_rest_api.api.execution_arn
  env                                 = var.env
}

module "route_get_secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.owner_resource.id
  resource_path_part                  = "getsecret"
  method_http_method                  = "GET"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app_name}-${var.env}-get-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
  function_name                       = "${var.app_name}-${var.env}-get-secret"
  execution_arn                       = aws_api_gateway_rest_api.api.execution_arn
  env                                 = var.env
}

resource "aws_api_gateway_resource" "owner_resource" {
  path_part   = "owner"
  parent_id   = aws_api_gateway_resource.secret_resource.id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_resource" "burnsecret_resource" {
  path_part   = "burnsecret"
  parent_id   = aws_api_gateway_resource.owner_resource.id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

module "route_burn_secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.burnsecret_resource.id
  resource_path_part                  = "{id+}"
  method_http_method                  = "DELETE"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app_name}-${var.env}-burn-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
  function_name                       = "${var.app_name}-${var.env}-burn-secret"
  execution_arn                       = aws_api_gateway_rest_api.api.execution_arn
  env                                 = var.env
}

module "route_consume_secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.secret_resource.id
  resource_path_part                  = "consumesecret"
  method_http_method                  = "POST"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app_name}-${var.env}-consume-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
  function_name                       = "${var.app_name}-${var.env}-consume-secret"
  execution_arn                       = aws_api_gateway_rest_api.api.execution_arn
  env                                 = var.env
}
