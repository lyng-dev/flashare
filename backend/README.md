# flashare-backend

Provides a way to share secrets in a secure way. You can easily configure this to run in your own AWS infrastructure, and share secrets in a much better and secure way.

## Setup guide

### Pre-requisites

1. an AWS account
2. a configured AWS CLI profile

### Steps

1. `git clone git@github.com:lyng-dev/flashare`
2. `yarn install`
3. `yarn build`
4. Open in your favorite editor
5. Run setup scripts:
   `./utilities/setup-env.sh`
   `./utilities/setup-prepare-aws.sh`

6. Find the `CONFIG:` variables, and replace them with your own
7. Deploy: `./terraform dev apply`
