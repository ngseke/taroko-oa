import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from './IconButton'

describe('IconIconButton', () => {
  test('click event', async () => {
    const handler = vi.fn()
    const text = 'Test IconButton'
    render(<IconButton onClick={handler}>{text}</IconButton>)

    await userEvent.click(screen.getByText(text))

    expect(handler).toBeCalledTimes(1)
  })
})
