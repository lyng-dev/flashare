import {
  decrypt,
  decryptWithPassword,
  encrypt,
  encryptWithPassword,
} from "./services/encryption.ts";

import { submitSecret, Values } from './components/CreateSecret/index.ts';

// async function doEncryptionRun() {
//   const encryptedString:string = await encrypt("Welcome to Denoland", "bananaphone");
//   const decryptedString:string = await decrypt(encryptedString, "bananaphone");
//   console.log(decryptedString);
// }

// doEncryptionRun();

console.log(Deno.args);

const values: Values = {
  secret: 'hello', 
  expiration: '5m',
  password: 'a',
  isPasswordProtected: true
};

console.log((await submitSecret(values)).toString());
