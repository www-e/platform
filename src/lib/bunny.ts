// src/lib/bunny.ts
import fetch from 'node-fetch'

const LIBRARY_ID = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!
const API_KEY     = process.env.BUNNY_STREAM_API_KEY!

export async function listVideos(page = 1, perPage = 100) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos?page=${page}&perPage=${perPage}`
  const res = await fetch(url, { headers: { AccessKey: API_KEY } })
  if (!res.ok) throw new Error(`Bunny listVideos failed: ${res.status}`)
  const { items, totalCount } = await res.json()
  return { videos: items, totalCount }
}

export async function getVideo(videoId: string) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`
  const res = await fetch(url, { headers: { AccessKey: API_KEY } })
  if (!res.ok) throw new Error(`Bunny getVideo failed: ${res.status}`)
  return res.json()
}
