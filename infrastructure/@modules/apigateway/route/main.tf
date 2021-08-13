# Resource: OAuth: Inbound purchaseorderslotbookingcreated
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.resource_parent_id
  path_part   = var.resource_path_part
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = var.rest_api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = var.method_http_method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id          = var.rest_api_id
  resource_id          = aws_api_gateway_resource.resource.id
  http_method          = aws_api_gateway_method.method.http_method
  type                 = var.integration_type
  uri                  = var.integration_uri
  integration_http_method = var.integration_integration_http_method
  timeout_milliseconds = var.integration_timeout_milliseconds
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowFlashareAPI-${var.function_name}-Invoke"
  action        = "lambda:InvokeFunction"
  function_name = var.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${var.execution_arn}/*/*/*"
}
