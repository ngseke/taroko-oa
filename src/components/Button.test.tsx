import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  test('click event', async () => {
    const handler = vi.fn()
    const text = 'Test Button'
    render(<Button onClick={handler}>{text}</Button>)

    await userEvent.click(screen.getByText(text))

    expect(handler).toBeCalledTimes(1)
  })

  test('disabled', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler} disabled />)

    await userEvent.click(screen.getByRole('button'))

    expect(handler).not.toBeCalled()
  })
})
