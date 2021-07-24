resource "aws_api_gateway_rest_api" "api" {
  name = "flashare-api-${var.env}"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowFlashareAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "hello-world"
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api" {
  deployment_id = aws_api_gateway_deployment.api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.env
}

resource "aws_api_gateway_resource" "health-resource" {
  path_part   = "health"
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "health-method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.health-resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "health-integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.health-resource.id
  http_method             = aws_api_gateway_method.health-method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:hello-world/invocations"
}

resource "aws_api_gateway_resource" "secret-resource" {
  path_part   = "secret"
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

module "route-create-secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.secret-resource.id
  resource_path_part                  = "create"
  method_http_method                  = "POST"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app-name}-create-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
}

resource "aws_api_gateway_resource" "owner-resource" {
  path_part   = "owner"
  parent_id   = aws_api_gateway_resource.secret-resource.id
  rest_api_id = aws_api_gateway_rest_api.api.id
}

module "route-get-secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.owner-resource.id
  resource_path_part                  = "getsecret"
  method_http_method                  = "GET"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app-name}-get-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
}

module "route-burn-secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.owner-resource.id
  resource_path_part                  = "burnsecret"
  method_http_method                  = "DELETE"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app-name}-burn-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
}

module "route-consume-secret" {
  source                              = "./route"
  rest_api_id                         = aws_api_gateway_rest_api.api.id
  resource_parent_id                  = aws_api_gateway_resource.secret-resource.id
  resource_path_part                  = "consumesecret"
  method_http_method                  = "POST"
  integration_type                    = "AWS_PROXY"
  integration_uri                     = "arn:aws:apigateway:us-east-1:lambda:path//2015-03-31/functions/arn:aws:lambda:us-east-1:${var.account_id}:function:${var.app-name}-consume-secret/invocations"
  integration_integration_http_method = "POST"
  integration_timeout_milliseconds    = 10000
}
