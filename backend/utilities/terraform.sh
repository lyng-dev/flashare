#!/bin/bash

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <environment> <command>"
    exit 1
fi

ENVIRONMENT=$1
shift 1
COMMAND=$@

run_command() {
  (
    cd infrastructure/$ENVIRONMENT
    terraform init
    terraform $COMMAND
  )
}

run_command
