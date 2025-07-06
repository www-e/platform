// src/lib/bunny-sign.ts
import crypto from 'crypto'

export function signUrl(path: string, expiresInSeconds = 3600) {
  const key      = process.env.BUNNY_TOKEN_AUTH_KEY!
  const hostname = process.env.BUNNY_CDN_HOSTNAME!
  const expires  = Math.floor(Date.now()/1000) + expiresInSeconds
  const token    = crypto
    .createHmac('sha256', key)
    .update(`${path}${expires}`)
    .digest('base64')
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
  return `https://${hostname}${path}?token=${token}&expires=${expires}`
}
