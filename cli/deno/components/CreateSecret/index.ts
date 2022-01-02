import * as keyService from '../../services/key.ts'
import * as encryptionService from '../../services/encryption.ts'
import { ICreateSecretEnvelope } from '../../models/api/index.ts'
import { convertExpirationChoice, expirationChoices } from '../../services/time-converter.ts'
import { createSecret } from '../../services/api.ts'

interface Values {
  secret: string
  expiration: string
  password: string
  isPasswordProtected: boolean
}

const submitSecret = async (values: Values) => {
  const encryptionKey = keyService.generateKey(8, 8)
  const encrypted =
      values.isPasswordProtected && !!values.password && values.password.length > 0
          ? await encryptionService.encrypt(values.secret, encryptionKey + values.password)
          : await encryptionService.encrypt(values.secret, encryptionKey)

  //create secret envelope
  const envelope: ICreateSecretEnvelope = {
      Expiration: convertExpirationChoice(values.expiration),
      Content: {
          isPasswordProtected: values.isPasswordProtected && !!values.password && values.password.length > 0,
          secret: escape(encrypted),
      },
  }

  //send envelope
  console.log(envelope)
  const response: Response = await createSecret(envelope)
  // history.push({
  //     pathname: generatePath('/secret/owner/:keyName', {
  //         keyName: response.data.keyName,
  //     }),
  //     hash: encryptionKey,
  // })
  return `https://flasha.re/secret/${response.json().then(thing => console.log(thing))}#${encryptionKey}` //used to be: response.data
}

export { submitSecret, type Values }
