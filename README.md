# flashare

Provides a way to share secrets in a secure way. You can easily configure this to run in your own AWS infrastructure, and share secrets in a much better and secure way.

## Setup guide

### Steps

3. `git clone git@github.com:lyng-dev/flashare`
4. `yarn install`
5. `yarn build`
6. Open in your favorite editor
7. Run setup scripts:
   `./utilities/setup-env-var.sh`
   `./utilities/setup-prepare-aws.sh`

8. Find the `CONFIG:` variables, and replace them with your own
9. Deploy: `./terraform dev apply`
