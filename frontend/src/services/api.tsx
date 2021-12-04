import { ICreateSecretEnvelope } from '../models/api'
import axios from 'axios'

const http = axios.create({
    baseURL: ' https://m5bc6coswg.execute-api.us-east-1.amazonaws.com/dev',
})

const consumeSecret = async (keyName: string) => {
    const url = `/secret/consumesecret`
    return http.post(url, JSON.stringify({ id: keyName }))
}

const createSecret = async (envelope: ICreateSecretEnvelope) => {
    const url = '/secret/create'
    return http.post(url, JSON.stringify(envelope))
}

const destroySecret = async (keyName: string) => {
    const url = `/secret/owner/burnsecret/${keyName}`
    return http.delete(url)
}

export { createSecret, consumeSecret, destroySecret }
