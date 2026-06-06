import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const trackClick = mutation({
  args: {
    linkId: v.id('links'),
    referrer: v.optional(v.string()),
    country: v.optional(v.string()),
    device: v.optional(v.string()),
    browser: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('clicks', {
      linkId: args.linkId,
      timestamp: Date.now(),
      referrer: args.referrer,
      country: args.country,
      device: args.device,
      browser: args.browser,
    })
  },
})

export const getLinkAnalytics = query({
  args: { linkId: v.id('links') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('clicks')
      .withIndex('by_link', q => q.eq('linkId', args.linkId))
      .order('desc')
      .collect()
  },
})