module "lambda_create_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app-name}-create-secret"
  handler       = "index.createSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/createSecret"
}

module "lambda_consume_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app-name}-consume-secret"
  handler       = "index.consumeSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/consumeSecret"
}

module "lambda_checkSecretsForDeletion" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app-name}-checkSecretsForDeletion"
  handler       = "index.checkSecretsForDeletion"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/checkSecretsForDeletion"
}

module "lambda_burn_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app-name}-burn-secret"
  handler       = "index.burnSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/burnSecret"
}

module "lambda_get_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app-name}-get-secret"
  handler       = "index.getSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/getSecret"
}
