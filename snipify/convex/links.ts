import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { nanoid } from 'nanoid'

export const getUserLinks = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('links')
      .withIndex('by_user', q => q.eq('userId', args.userId))
      .order('desc')
      .collect()
  },
})

export const getLinkBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('links')
      .withIndex('by_slug', q => q.eq('slug', args.slug))
      .first()
  },
})

export const createLink = mutation({
  args: {
    userId: v.string(),
    originalUrl: v.string(),
    customSlug: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.customSlug) {
      const existing = await ctx.db
        .query('links')
        .withIndex('by_slug', q => q.eq('slug', args.customSlug!))
        .first()
      if (existing) throw new Error('Slug already taken')
    }

    const slug = args.customSlug || nanoid(6)

    return await ctx.db.insert('links', {
      userId: args.userId,
      originalUrl: args.originalUrl,
      slug,
      customSlug: args.customSlug,
      clicks: 0,
      expiresAt: args.expiresAt,
      isExpired: false,
      createdAt: Date.now(),
    })
  },
})

export const deleteLink = mutation({
  args: { linkId: v.id('links') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.linkId)
  },
})

export const incrementClicks = mutation({
  args: { linkId: v.id('links') },
  handler: async (ctx, args) => {
    const link = await ctx.db.get(args.linkId)
    if (!link) return
    await ctx.db.patch(args.linkId, { clicks: link.clicks + 1 })
  },
})

export const getLinkById = query({
  args: { linkId: v.id('links') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.linkId)
  },
})