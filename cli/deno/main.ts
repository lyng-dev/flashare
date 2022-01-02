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

//Have we specified a secret of a secret file, otherwise ask
if (!args.secret && !args.file) {
  args.secret = args.s = await Secret.prompt('Please enter your secret: ')
  if (!args.secret) Deno.exit(0)
}
else if (args.file && typeof args.file === "string") {
  //is supplied file valid ?
  const fileExists = await exists(args.file)
  if (!fileExists) {
    console.log(`ERROR >>>>> The specified file '${args.file}' does not exist on this file system.\nExiting.`)
    Deno.exit(1)
  } else {
    //read the file in as the secret
    args.secret = new TextDecoder().decode(await Deno.readFile(args.file))
  }
}

//Have we specified a password, or explicitly said no password, otherwise ask
if (!args.password && !args.nopass) {
  args.password = args.p = await Secret.prompt('Enter a password (or leave blank): ') ?? false
}

const secret = args.secret;
const expiration = args.expire;
const password = args.password;
const isPasswordProtected = args.password;

const values: Values = {
  secret, 
  expiration,
  password: password ? password : '',
  isPasswordProtected,
};
console.log(`Creating secret link...`)
console.log(`\nDone.\n\nShare this link >>>>>>> ${(await submitSecret(values)).toString()}\n`);
