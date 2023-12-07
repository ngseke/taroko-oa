import { render, screen } from '@testing-library/react'
import { Input } from './Input'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  test('displays the label text', () => {
    render(<Input label="Test Label" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  test('onChange', async () => {
    const handler = vi.fn()
    render(<Input onChange={handler} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'new value')
    expect(handler).toHaveBeenCalledWith('new value')
  })

  test('disabled', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})
