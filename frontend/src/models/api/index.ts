//Secrets
export interface ICreateSecretEnvelope {
    Expiration: number
    Content: ISecretContent
}

export interface ConsumeSecretEnvelope {
    Content: ISecretContent
}

export interface ISecretContent {
    secret: string
    isPasswordProtected: boolean
}

export interface ICreateSecret {
    secret: string
    expiration: number
}

export interface ICreatedSecretResult {
    keyName: string
    statusCode: number
}

export interface IRequestedSecretResult {
    keyName: string
    secret: string
    statusCode: number
}

export interface IConsumeSecret {
    keyName: string
    secret: string
}

export interface IBurnedSecretResult {
    keyName: string
    statusCode: number
}

export interface IScheduledDelete {
    keyName: string
    expirationDate: string
}
