resource "aws_iam_role" "exec_lambda_role" {
  name = "${var.app_name}-exec-lambda"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy" "s3_rw_policy" {
  name = "s3_rw_policy"
  role = aws_iam_role.exec_lambda_role.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:*",
          "sqs:*",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}