resource "aws_sqs_queue" "delete-queue" {
  name = "${var.app_name}-${var.env}-delete-secrets.fifo"
  fifo_queue = true
  message_retention_seconds = 700000 #a bit more than 7 days
  delay_seconds = 1
  visibility_timeout_seconds = 60
}
