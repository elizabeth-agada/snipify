import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  try {
    const link = await convex.query(api.links.getLinkBySlug, { slug })

    if (!link) {
      return NextResponse.redirect(new URL('/?error=not_found', request.url))
    }

    if (link.isExpired || (link.expiresAt && link.expiresAt < Date.now())) {
      return new NextResponse('This link has expired', { status: 410 })
    }

    await convex.mutation(api.links.incrementClicks, { linkId: link._id })

    return NextResponse.redirect(link.originalUrl, { status: 302 })
  } catch (err) {
    console.error('Redirect error:', err)
    return NextResponse.redirect(new URL('/', request.url))
  }
}