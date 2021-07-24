npx esbuild ./src/lambdas/createSecret/index.ts --bundle --platform=node --outfile=./dist/lambdas/createSecret/index.js --target=node14
npx esbuild ./src/lambdas/consumeSecret/index.ts --bundle --platform=node --outfile=./dist/lambdas/consumeSecret/index.js --target=node14
npx esbuild ./src/lambdas/burnSecret/index.ts --bundle --platform=node --outfile=./dist/lambdas/burnSecret/index.js --target=node14
npx esbuild ./src/lambdas/getSecret/index.ts --bundle --platform=node --outfile=./dist/lambdas/getSecret/index.js --target=node14
npx esbuild ./src/lambdas/checkSecretsForDeletion/index.ts --bundle --platform=node --outfile=./dist/lambdas/checkSecretsForDeletion/index.js --target=node14
