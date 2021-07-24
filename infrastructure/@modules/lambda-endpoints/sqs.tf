resource "aws_sqs_queue" "delete-queue" {
  name = "${var.app_name}-${var.env}-sqs-queue-delete-secrets"

  # timings
  visibility_timeout_seconds = 60
  message_retention_seconds = 605000
}