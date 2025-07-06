// src/app/api/admin/sync-videos/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { listVideos } from '@/lib/bunny'

export async function POST() {
  const { videos } = await listVideos()
  await Promise.all(videos.map(v =>
    prisma.video.upsert({
      where: { bunnyVideoId: v.guid },
      update: {
        title: v.title,
        duration: v.durationInSeconds,
        thumbnailUrl: v.previewImageUrls?.[0] || null,
      },
      create: {
        bunnyVideoId: v.guid,
        title: v.title,
        duration: v.durationInSeconds,
        thumbnailUrl: v.previewImageUrls?.[0] || null,
        order: 0,
        courseId: '', // assign manually or via your Course pairing logic
      },
    })
  ))
  return NextResponse.json({ synced: videos.length })
}
