import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  test('display error message', () => {
    const { container, rerender } = render(<ErrorMessage error={undefined} />)
    expect(container.firstChild).toBeNull()

    rerender(<ErrorMessage error={new Error('message')} />)
    expect(screen.getByText('message')).toBeInTheDocument()
  })
})
