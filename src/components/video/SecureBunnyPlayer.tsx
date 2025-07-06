// src/components/video/SecureBunnyPlayer.tsx
'use client'
import BunnyPlayer from './BunnyPlayer'
import { signUrl } from '@/lib/bunny-sign'

export default function SecureBunnyPlayer({ videoId }: { videoId: string }) {
  const playlistPath = `/library/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/videos/${videoId}/playlist.m3u8`
  const signed = signUrl(playlistPath)
  return <BunnyPlayer embedUrl={signed} />
}
