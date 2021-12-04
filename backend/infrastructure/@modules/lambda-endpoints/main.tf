module "lambda_create_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app_name}-${var.env}-create-secret"
  handler       = "index.createSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/createSecret"

  environment_variables = {
    ENV = var.env
    BUCKET = var.bucket
    AWS_ACCOUNT_ID = var.account_id
  }
}

module "lambda_consume_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app_name}-${var.env}-consume-secret"
  handler       = "index.consumeSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/consumeSecret"

  environment_variables = {
    ENV = var.env
    BUCKET = var.bucket
    AWS_ACCOUNT_ID = var.account_id
  }
}

module "lambda_checkScheduledSecretsForDeletion" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app_name}-${var.env}-checkScheduledSecretsForDeletion"
  handler       = "index.checkScheduledSecretsForDeletion"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/checkScheduledSecretsForDeletion"

  environment_variables = {
    ENV = var.env
    BUCKET = var.bucket
    AWS_ACCOUNT_ID = var.account_id
  }

  event_source_mapping = {
    sqs = {
      event_source_arn = aws_sqs_queue.delete-queue.arn
    }
  }

  depends_on = [aws_sqs_queue.delete-queue]
}

module "lambda_burn_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app_name}-${var.env}-burn-secret"
  handler       = "index.burnSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/burnSecret"

  environment_variables = {
    ENV = var.env
    BUCKET = var.bucket
    AWS_ACCOUNT_ID = var.account_id
  }
}

module "lambda_get_secret" {
  source = "terraform-aws-modules/lambda/aws"

  create_role                       = false
  use_existing_cloudwatch_log_group = false
  
  lambda_role = aws_iam_role.exec_lambda_role.arn

  memory_size = 128 # MB
  timeout = 15 # Seconds

  function_name = "${var.app_name}-${var.env}-get-secret"
  handler       = "index.getSecret"
  runtime       = "nodejs14.x"

  source_path = "../../dist/lambdas/getSecret"

  environment_variables = {
    ENV = var.env
    BUCKET = var.bucket
    AWS_ACCOUNT_ID = var.account_id
  }
}
