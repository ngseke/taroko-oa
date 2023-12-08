import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SortIconButton } from './SortIconButton'

describe('SortIconButton', () => {
  test('click event', async () => {
    const handler = vi.fn()
    render(<SortIconButton onClick={handler} sortOrder="asc" />)

    await userEvent.click(screen.getByRole('button'))

    expect(handler).toBeCalledTimes(1)
  })
})
