import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export async function LRANGE(key, start, stop) {
    return await client.LRANGE(key, start, stop);
}
export async function RPUSH(key, element) {
    return await client.RPUSH(key, element)
}
export async function GET(key) {
    return await client.get(key)
}
export async function SET(key, value) {
    return await client.SET(key, value)
}
export async function DEL(key) {
    return await client.DEL(key)
}
//TODO: export stuff here