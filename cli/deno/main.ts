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
    h: 'help',
    p: 'password',
    e: 'expire',
    s: 'secret',
    f: 'file'
  },
  default: {
    h: false,
    s: false,
    f: false,
    e: '5m',
    p: false,
    nopass: false,
  }

};

const newSecret: any = parse(Deno.args, denoArgsConfig)
console.log("------------------------------------------")
console.log("> flasha.re - Cloud based secret sharing <")
console.log("------------------------------------------")
                                          
                                          

if (newSecret.help) {
  console.log('Usage: flashare -h -f <relative_file> -s <secret> -p <password> -e <expiration> --nopass')
  console.log('-h, --help: prints out help')
  console.log('-f, --file <relative file>, if -s is also specified then file takes precedence')
  console.log('-s, --secret <secret text>, if -f is also specified then file takes precedence')
  console.log('-e, --expire <5m|30m|1h|3h|12h|1d|3d|7d> defines expiration')
  console.log('-p, --password <password>, if no value is passed, then user will be asked')
  console.log('--nopass, no password will be set')
} 
else {
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
  console.log(`Creating secret link...`)
  console.log(`\nDone.\n\nShare this link >>>>>>> ${(await submitSecret(values)).toString()}\n`);
}
