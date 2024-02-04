#!/usr/bin/bash

# set target
TARGET=s3://flashare-frontend
DISTRIBUTION=E1O6A3IF62WOV2

# sync to s3
aws s3 sync "./build" "$TARGET" --acl public-read

# invalidate cache
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*"