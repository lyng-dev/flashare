//cmd.ts
import { parse } from "https://deno.land/std/flags/mod.ts"
import { exists } from "https://deno.land/std/fs/mod.ts"
import { Secret } from "https://deno.land/x/cliffy/prompt/secret.ts";
import { submitSecret, Values } from './components/CreateSecret/index.ts';

type NewCliSecret = {
  password: string,
  expire: string,
  secret: string,
  file: string,
}

const denoArgsConfig = {
  alias: {
    p: 'password',
    e: 'expire',
    s: 'secret',
    f: 'file'
  },
  default: {
    s: false,
    f: false,
    e: '5m',
    p: false,
    nopass: false,
  }

};

const newSecret: any = parse(Deno.args, denoArgsConfig)

//Have we specified a secret of a secret file, otherwise ask
if (!newSecret.secret && !newSecret.file) {
  newSecret.secret = newSecret.s = await Secret.prompt('Please enter your secret: ')
  if (!newSecret.secret) Deno.exit()
} else if (newSecret.file && typeof newSecret.file === "string") {
  //is supplied file valid ?
  const fileExists = await exists(newSecret.file)
  if (!fileExists) {
    console.log('FLASHA.RE ERROR >>>>>')
    console.log(`The specified file '${newSecret.file}' does not exist on this file system.\nExiting.`)
    Deno.exit()
  } else {
    //read the file in as the secret
    newSecret.secret = new TextDecoder().decode(await Deno.readFile(newSecret.file))
  }
}

//Have we specified a password, or explicitly said no password, otherwise ask
if (!newSecret.password && !newSecret.nopass) {
  newSecret.password = newSecret.p = await Secret.prompt('Please enter your password: ') ?? false
}

const secret = newSecret.secret;
const expiration = newSecret.expire;
const password = newSecret.password;
const isPasswordProtected = newSecret.password;

const values: Values = {
  secret, 
  expiration,
  password: password ? password : '',
  isPasswordProtected,
};

console.log((await submitSecret(values)).toString());

