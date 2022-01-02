import { parse } from "https://deno.land/std/flags/mod.ts";

//configuration for CLI arguments
const argsConfig = {
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

const printTitle = () => {
  console.log("------------------------------------------")
  console.log("> flasha.re - Cloud based secret sharing <")
  console.log("------------------------------------------")
}

const printUsage = () => {
  console.log('Usage: flashare -h -f <relative_file> -s <secret> -p <password> -e <expiration> --nopass')
  console.log('-h, --help: prints out help')
  console.log('-f, --file <relative file>, if -s is also specified then file takes precedence')
  console.log('-s, --secret <secret text>, if -f is also specified then file takes precedence')
  console.log('-e, --expire <5m|30m|1h|3h|12h|1d|3d|7d> defines expiration')
  console.log('-p, --password <password>, if no value is passed, then user will be asked')
  console.log('--nopass, no password will be set')
  Deno.exit(0);
}

const parseArgs = (args: string[]) => parse(args, argsConfig)

export { parseArgs, printTitle, printUsage };