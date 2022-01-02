//cmd.ts
import { exists } from "https://deno.land/std/fs/mod.ts";
import { Secret } from "https://deno.land/x/cliffy/prompt/secret.ts";
import { submitSecret, Values } from './components/CreateSecret/index.ts';
import { parseArgs, printTitle, printUsage } from './cli.ts'; 

printTitle();

//Parse arguments
const args = parseArgs(Deno.args)

//Exit: if user has requested Help
if (args.help) printUsage();

//If we haven't specified secret based on file or input, then query user for secret
if (!args.secret && !args.file) {
  args.secret = args.s = await Secret.prompt('Please enter your secret: ')
  if (!args.secret) Deno.exit(0)
}
//Otherwise, if we have specified a file
else if (args.file && typeof args.file === "string") {
  //Check if file exists
  const fileExists = await exists(args.file)
  if (!fileExists) { //And if not, fail
    console.log(`ERROR >>>>> The specified file '${args.file}' does not exist on this file system.\nExiting.`)
    Deno.exit(1)
  } else {
    //But if it does, then read the file and prepare it for the secret
    args.secret = new TextDecoder().decode(await Deno.readFile(args.file))
  }
}

//Have we specified a password, or explicitly said no password, otherwise ask
if (!args.password && !args.nopass) {
  args.password = args.p = await Secret.prompt('Enter a password (or leave blank): ') ?? false
}

//Build envelope
const envelopeValues: Values = {
  secret: args.secret, 
  expiration: args.expiration,
  password: args.password ? args.password : '',
  isPasswordProtected: args.password,
};

console.log(`Creating secret link...`)
console.log(`\nDone.\n\nShare this link >>>>>>> ${(await submitSecret(envelopeValues)).toString()}\n`);
