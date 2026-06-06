import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  links: defineTable({
    userId: v.string(),
    originalUrl: v.string(),
    slug: v.string(),
    customSlug: v.optional(v.string()),
    clicks: v.number(),
    expiresAt: v.optional(v.number()),
    isExpired: v.boolean(),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_slug', ['slug']),

  clicks: defineTable({
    linkId: v.id('links'),
    timestamp: v.number(),
    referrer: v.optional(v.string()),
    country: v.optional(v.string()),
    device: v.optional(v.string()),
    browser: v.optional(v.string()),
  })
    .index('by_link', ['linkId'])
    .index('by_timestamp', ['timestamp']),
})