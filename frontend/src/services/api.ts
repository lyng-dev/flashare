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

const baseURL = 'https://c01ct1co92.execute-api.us-east-1.amazonaws.com/dev';

const consumeSecret = async (keyName: string) => { 
    const path = `/secret/consumesecret`;
    const response = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        body: JSON.stringify({ id: keyName }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response;
}

const createSecret = async (envelope: ICreateSecretEnvelope) => {
    const path = `/secret/create`;
    const response = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        body: JSON.stringify(envelope),
        headers: {
            'Origin': 'https://flasha.re',
            'Referer': 'https://flasha.re/',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response;
}

const destroySecret = async (keyName: string) => {
    const path = `/secret/owner/burnsecret/${keyName}`;
    const response = await fetch(`${baseURL}${path}`, { method: 'DELETE' });
    return response;
}

export { createSecret, consumeSecret, destroySecret }
	