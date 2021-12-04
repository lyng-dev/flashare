variable "rest_api_id" {}

variable "resource_path_part" {}

variable "resource_parent_id" {}

variable "method_http_method" {}

variable "integration_type" {
    default = "HTTP_PROXY"
}

variable "integration_uri" {}

variable "integration_integration_http_method" {
    default = "POST"
}

variable "integration_timeout_milliseconds" {
    default = 10000
}

variable "function_name" {}

variable "execution_arn" {}

variable "env" {}