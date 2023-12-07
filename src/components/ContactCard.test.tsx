import { render, screen } from '@testing-library/react'
import { ContactCard } from './ContactCard'
import userEvent from '@testing-library/user-event'

describe('ContactCard', () => {
  test('info should be rendered', async () => {
    const props = {
      job: 'test job',
      name: 'test name',
      description: 'test description',
    }
    render(<ContactCard {...props} />)

    expect(screen.getByRole('img')).toBeInTheDocument()

    expect(screen.getByText(props.job)).toBeInTheDocument()
    expect(screen.getByText(props.name)).toBeInTheDocument()
    expect(screen.getByText(props.description)).toBeInTheDocument()
  })

  test('button events', async () => {
    const props = {
      onClickEdit: vi.fn(),
      onClickDelete: vi.fn(),
    }
    render(<ContactCard {...props} />)

    await userEvent.click(screen.getByText('Edit'))
    expect(props.onClickEdit).toBeCalledTimes(1)

    await userEvent.click(screen.getByText('Delete'))
    expect(props.onClickDelete).toBeCalledTimes(1)
  })
})
