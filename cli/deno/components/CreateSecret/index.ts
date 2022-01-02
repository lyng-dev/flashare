import * as keyService from '../../services/key.ts'
import * as encryptionService from '../../services/encryption.ts'
import { convertExpirationChoice, expirationChoices } from '../../services/time-converter.ts'
import { createSecret, ICreateSecretEnvelope } from '../../services/api.ts'

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
  const response: Response = await createSecret(envelope)
  const secret: { keyName: string } = await response.json()
  return `https://flasha.re/secret/${secret.keyName}#${encryptionKey}` //used to be: response.data
}

export { submitSecret, type Values }
