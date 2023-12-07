import { render, screen } from '@testing-library/react'
import { ContactForm } from './ContactForm'
import userEvent from '@testing-library/user-event'

describe('ContactForm component', () => {
  const mockDraft = { firstName: '', lastName: '', job: '', description: '' }
  const mockOnChangeDraft = vi.fn()
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  const mockProps = {
    draft: mockDraft,
    onChangeDraft: mockOnChangeDraft,
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
  }

  beforeEach(() => {
    mockOnChangeDraft.mockReset()
    mockOnSubmit.mockReset()
    mockOnCancel.mockReset()
  })

  test('renders all form elements', () => {
    const mockDraft = { firstName: 'firstName', lastName: 'lastName', job: 'job', description: 'description' }
    render(<ContactForm {...mockProps} draft={mockDraft} />)
    expect(screen.getByLabelText('First Name')).toHaveValue(mockDraft.firstName)
    expect(screen.getByLabelText('Last Name')).toHaveValue(mockDraft.lastName)
    expect(screen.getByLabelText('Job')).toHaveValue(mockDraft.job)
    expect(screen.getByLabelText('Description')).toHaveValue(mockDraft.description)

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  test('calls onChangeDraft when input value changes', async () => {
    render(<ContactForm {...mockProps} />)

    await userEvent.type(screen.getByLabelText('First Name'), 'A')
    expect(mockOnChangeDraft).toBeCalledWith(
      expect.objectContaining({ firstName: 'A' })
    )

    await userEvent.type(screen.getByLabelText('Last Name'), 'A')
    expect(mockOnChangeDraft).toBeCalledWith(
      expect.objectContaining({ lastName: 'A' })
    )

    await userEvent.type(screen.getByLabelText('Job'), 'A')
    expect(mockOnChangeDraft).toBeCalledWith(
      expect.objectContaining({ job: 'A' })
    )

    await userEvent.type(screen.getByLabelText('Description'), 'A')
    expect(mockOnChangeDraft).toBeCalledWith(
      expect.objectContaining({ description: 'A' })
    )
  })

  test('disabled', async () => {
    render(<ContactForm {...mockProps} disabled />)
    screen.getAllByRole('textbox').forEach(textbox => {
      expect(textbox).toBeDisabled()
    })

    expect(screen.getByText('Submit')).toBeDisabled()
  })

  test('loading', async () => {
    render(
      <ContactForm {...mockProps} loading />
    )
    screen.getAllByRole('textbox').forEach(textbox => {
      expect(textbox).toBeDisabled()
    })

    screen.getAllByRole('textbox').forEach(textbox => {
      expect(textbox).toBeDisabled()
    })
  })

  test('submit button should be disabled if some textbox is empty', async () => {
    const { rerender } = render(<ContactForm {...mockProps} />)
    expect(screen.getByText('Submit')).toBeDisabled()

    rerender(<ContactForm {...mockProps} draft={{ firstName: ' ', lastName: 'A', job: 'B', description: 'C' }} />)
    expect(screen.getByText('Submit')).toBeDisabled()

    rerender(<ContactForm {...mockProps} draft={{ firstName: 'A', lastName: '', job: 'B', description: 'C' }} />)
    expect(screen.getByText('Submit')).toBeDisabled()

    rerender(<ContactForm {...mockProps} draft={{ firstName: 'A', lastName: 'B', job: ' ', description: 'C' }} />)
    expect(screen.getByText('Submit')).toBeDisabled()

    rerender(<ContactForm {...mockProps} draft={{ firstName: 'A', lastName: 'B', job: 'C', description: '' }} />)
    expect(screen.getByText('Submit')).toBeDisabled()

    rerender(<ContactForm {...mockProps} draft={{ firstName: 'A', lastName: 'B', job: 'C', description: 'D' }} />)
    expect(screen.getByText('Submit')).toBeEnabled()
  })

  test('submit and cancel', async () => {
    render(<ContactForm {...mockProps} draft={{ firstName: 'A', lastName: 'B', job: 'C', description: 'D' }} />)

    await userEvent.click(screen.getByText('Submit'))
    expect(mockOnSubmit).toHaveBeenCalledOnce()

    await userEvent.click(screen.getByText('Cancel'))
    expect(mockOnCancel).toHaveBeenCalledOnce()
  })
})
