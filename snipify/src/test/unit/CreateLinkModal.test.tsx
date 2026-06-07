import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CreateLinkModal from '../../components/CreateLinkModal'

vi.mock('convex/react', () => ({
  useMutation: () => vi.fn(),
}))

vi.mock('@clerk/nextjs', () => ({
  useUser: () => ({ user: { id: 'user_123' } }),
}))

vi.mock('../../convex/_generated/api', () => ({
  api: { links: { createLink: 'links:createLink' } },
}))

describe('CreateLinkModal', () => {
  it('renders the modal with form fields', () => {
    render(<CreateLinkModal onClose={() => {}} />)
    expect(screen.getByPlaceholderText('https://example.com/long-url')).toBeDefined()
    expect(screen.getByPlaceholderText('my-link')).toBeDefined()
  })

  it('renders create link and cancel buttons', () => {
    render(<CreateLinkModal onClose={() => {}} />)
    expect(screen.getByText('Create link')).toBeDefined()
    expect(screen.getByText('Cancel')).toBeDefined()
  })

  it('calls onClose when cancel is clicked', () => {
    const onClose = vi.fn()
    render(<CreateLinkModal onClose={onClose} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalled()
  })

  it('submit button is disabled when URL is empty', () => {
    render(<CreateLinkModal onClose={() => {}} />)
    const submitBtn = screen.getByText('Create link')
    expect(submitBtn.closest('button')).toHaveProperty('disabled', true)
  })
})