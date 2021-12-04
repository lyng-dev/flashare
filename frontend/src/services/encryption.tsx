const bufferToBase64 = (buffer: any) => btoa(String.fromCharCode.apply(null, buffer))
const base64ToBuffer = (base64: any) => Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)) //null ?
const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

const encrypt = async (dataToEncrypt: string, key: string) => {
    const encryptedData = await doEncryption(dataToEncrypt, key)
    return encryptedData
}

const encryptWithPassword = async (dataToEncrypt: string, key: string, password: string) => {
    const encryptedData = await encrypt(dataToEncrypt, key + password)
    return encryptedData
}

const decrypt = async (dataToDecrypt: string, key: string) => {
    const decryptedData = await doDecryption(dataToDecrypt, key)
    return decryptedData
}

const decryptWithPassword = async (dataToDecrypt: string, key: string, password: string) => {
    const decryptedData = await decrypt(dataToDecrypt, key + password)
    return decryptedData
}

const getPasswordKey = async (key: string) =>
    window.crypto.subtle.importKey('raw', textEncoder.encode(key), 'PBKDF2', false, ['deriveKey'])

const deriveKey = (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: any) =>
    window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 250000,
            hash: 'SHA-256',
        },
        passwordKey,
        {
            name: 'AES-GCM',
            length: 256,
        },
        false,
        keyUsage
    )

const doEncryption = async (secretData: string, key: string) => {
    try {
        const salt = window.crypto.getRandomValues(new Uint8Array(16))
        const iv = window.crypto.getRandomValues(new Uint8Array(12))
        const passwordKey = await getPasswordKey(key)
        const aesKey = await deriveKey(passwordKey, salt, ['encrypt'])
        const encryptedContent = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            aesKey,
            textEncoder.encode(secretData)
        )

        const encryptedContentArr = new Uint8Array(encryptedContent)
        let buff = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContentArr.byteLength)
        buff.set(salt, 0)
        buff.set(iv, salt.byteLength)
        buff.set(encryptedContentArr, salt.byteLength + iv.byteLength)
        const base64Buffer = bufferToBase64(buff)
        return base64Buffer
    } catch (e) {
        console.log(`Encryption failed - ${e}`)
        return ''
    }
}

const doDecryption = async (encryptedData: string, key: string) => {
    try {
        const encryptedDataBuff = base64ToBuffer(encryptedData)
        const salt = encryptedDataBuff.slice(0, 16)
        const iv = encryptedDataBuff.slice(16, 16 + 12)
        const data = encryptedDataBuff.slice(16 + 12)
        const passwordKey = await getPasswordKey(key)
        const aesKey = await deriveKey(passwordKey, salt, ['decrypt'])
        const decryptedContent = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            aesKey,
            data
        )
        return textDecoder.decode(decryptedContent)
    } catch (e) {
        console.log(`Decryption failed - ${e}`)
        return '>>> flasha.re SYSTEM: ERROR DECRYPTING MESSAGE'
    }
}

export { encrypt, encryptWithPassword, decrypt, decryptWithPassword }
