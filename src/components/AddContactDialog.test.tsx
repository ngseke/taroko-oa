/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen } from '@testing-library/react'
import { AddContactDialog } from './AddContactDialog'
import userEvent from '@testing-library/user-event'
import * as apis from '../modules/apis'

describe('AddContactDialog', () => {
  const mockOnClose = vi.fn()
  const mockOnSuccess = vi.fn()

  const mockRestoreSpy = vi.spyOn(apis, 'createContact')
    .mockResolvedValue()

  const mockProps = {
    onClose: mockOnClose,
    onSuccess: mockOnSuccess,
  }

  beforeEach(() => {
    mockOnClose.mockReset()
    mockOnSuccess.mockReset()
  })

  test('should not be opened when open is false', () => {
    render(
      <AddContactDialog {...mockProps} open={false} />
    )
    expect(HTMLDialogElement.prototype.showModal).not.toBeCalled()
  })

  test('submit', async () => {
    render(
      <AddContactDialog {...mockProps} open />
    )

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce()

    await userEvent.type(screen.getByLabelText('First Name'), 'new first_name')
    await userEvent.type(screen.getByLabelText('Last Name'), 'new last_name')
    await userEvent.type(screen.getByLabelText('Job'), 'new job')
    await userEvent.type(screen.getByLabelText('Description'), 'new description')

    await userEvent.click(screen.getByText('Submit'))

    expect(mockRestoreSpy).toBeCalledWith(
      expect.objectContaining({
        description: 'new description',
        firstName: 'new first_name',
        job: 'new job',
        lastName: 'new last_name',
      })
    )
    expect(mockOnClose).toHaveBeenCalledOnce()
    expect(mockOnSuccess).toHaveBeenCalledOnce()
  })

  test('cancel', async () => {
    render(<AddContactDialog {...mockProps} open />)
    await userEvent.click(await screen.findByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalledOnce()
  })
})
