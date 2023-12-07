/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen } from '@testing-library/react'
import { EditContactDialog } from './EditContactDialog'
import userEvent from '@testing-library/user-event'
import * as apis from '../modules/apis'

describe('EditContactDialog', () => {
  const mockOnClose = vi.fn()
  const mockOnSuccess = vi.fn()

  const contactId = 666
  const fetchContactSpy = vi.spyOn(apis, 'fetchContact')
    .mockResolvedValue({
      id: contactId,
      first_name: 'first_name',
      last_name: 'last_name',
      job: 'job',
      description: 'description',
    })
  const updateContactSpy = vi.spyOn(apis, 'updateContact')
    .mockResolvedValue()

  const mockProps = {
    onClose: mockOnClose,
    onSuccess: mockOnSuccess,
  }

  beforeEach(() => {
    mockOnClose.mockReset()
    mockOnSuccess.mockReset()
  })

  test('should not be opened when `contactId` is null', () => {
    render(
      <EditContactDialog {...mockProps} contactId={null} />
    )
    expect(HTMLDialogElement.prototype.showModal).not.toBeCalled()
  })

  test('initial draft and submit', async () => {
    render(
      <EditContactDialog {...mockProps} contactId={contactId} />
    )

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce()
    expect(fetchContactSpy).toBeCalledWith(contactId)

    ;(await screen.findAllByRole('textbox', { hidden: true }))
      .forEach(textbox => expect(textbox).toHaveValue())

    await userEvent.type(screen.getByLabelText('First Name'), ' new')
    await userEvent.type(screen.getByLabelText('Last Name'), ' new')
    await userEvent.type(screen.getByLabelText('Job'), ' new')
    await userEvent.type(screen.getByLabelText('Description'), ' new')

    await userEvent.click(screen.getByText('Submit'))

    expect(updateContactSpy).toBeCalledWith(
      contactId,
      expect.objectContaining({
        description: 'description new',
        firstName: 'first_name new',
        job: 'job new',
        lastName: 'last_name new',
      })
    )
    expect(mockOnClose).toHaveBeenCalledOnce()
    expect(mockOnSuccess).toHaveBeenCalledOnce()
  })

  test('cancel', async () => {
    render(<EditContactDialog {...mockProps} contactId={contactId} />)
    await userEvent.click(await screen.findByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalledOnce()
  })
})
