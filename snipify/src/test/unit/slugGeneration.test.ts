import { describe, it, expect } from 'vitest'

// Slug generation logic
function generateSlug(length = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9-]{3,50}$/.test(slug)
}

function isReservedSlug(slug: string): boolean {
  const reserved = ['api', 'dashboard', 'admin', 'login', 'sign-in', 'sign-up']
  return reserved.includes(slug.toLowerCase())
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function calculateExpiryDate(days: number): number {
  return Date.now() + days * 24 * 60 * 60 * 1000
}

describe('Slug Generation', () => {
  it('generates a slug with default length of 6', () => {
    const slug = generateSlug()
    expect(slug).toHaveLength(6)
  })

  it('generates a slug with custom length', () => {
    const slug = generateSlug(8)
    expect(slug).toHaveLength(8)
  })

  it('generates different slugs each time', () => {
    const slug1 = generateSlug()
    const slug2 = generateSlug()
    expect(slug1).not.toBe(slug2)
  })

  it('slug only contains valid characters', () => {
    const slug = generateSlug()
    expect(slug).toMatch(/^[a-zA-Z0-9]+$/)
  })
})

describe('Slug Validation', () => {
  it('accepts valid slugs', () => {
    expect(isValidSlug('my-link')).toBe(true)
    expect(isValidSlug('abc123')).toBe(true)
    expect(isValidSlug('my-brand-2024')).toBe(true)
  })

  it('rejects slugs that are too short', () => {
    expect(isValidSlug('ab')).toBe(false)
  })

  it('rejects slugs that are too long', () => {
    expect(isValidSlug('a'.repeat(51))).toBe(false)
  })

  it('rejects slugs with special characters', () => {
    expect(isValidSlug('my link')).toBe(false)
    expect(isValidSlug('my@link')).toBe(false)
  })
})

describe('Reserved Slug Detection', () => {
  it('detects reserved slugs', () => {
    expect(isReservedSlug('api')).toBe(true)
    expect(isReservedSlug('dashboard')).toBe(true)
    expect(isReservedSlug('admin')).toBe(true)
  })

  it('allows non-reserved slugs', () => {
    expect(isReservedSlug('my-link')).toBe(false)
    expect(isReservedSlug('snipify')).toBe(false)
  })

  it('is case insensitive', () => {
    expect(isReservedSlug('API')).toBe(true)
    expect(isReservedSlug('Dashboard')).toBe(true)
  })
})

describe('URL Validation', () => {
  it('accepts valid URLs', () => {
    expect(isValidUrl('https://google.com')).toBe(true)
    expect(isValidUrl('https://example.com/path?q=test')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
  })

  it('rejects invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false)
    expect(isValidUrl('google.com')).toBe(false)
    expect(isValidUrl('')).toBe(false)
  })
})

describe('Expiry Date Calculation', () => {
  it('calculates expiry date correctly for 1 day', () => {
    const now = Date.now()
    const expiry = calculateExpiryDate(1)
    const diff = expiry - now
    expect(diff).toBeGreaterThan(86399000)
    expect(diff).toBeLessThan(86401000)
  })

  it('calculates expiry date correctly for 7 days', () => {
    const now = Date.now()
    const expiry = calculateExpiryDate(7)
    const diff = expiry - now
    expect(diff).toBeGreaterThan(7 * 86399000)
    expect(diff).toBeLessThan(7 * 86401000)
  })

  it('expiry date is in the future', () => {
    const expiry = calculateExpiryDate(1)
    expect(expiry).toBeGreaterThan(Date.now())
  })
})