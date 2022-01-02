import { ICreateSecretEnvelope } from '../models/api/index.ts'

const baseURL = 'https://m5bc6coswg.execute-api.us-east-1.amazonaws.com/dev';

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
    console.log(JSON.stringify(envelope))
    console.log(`${baseURL}${path}`)
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
    console.log(await response.json())
    return response;
}

const destroySecret = async (keyName: string) => {
    const path = `/secret/owner/burnsecret/${keyName}`;
    const response = await fetch(`${baseURL}${path}`, { method: 'DELETE' });
    return response;
}

export { createSecret, consumeSecret, destroySecret }
	