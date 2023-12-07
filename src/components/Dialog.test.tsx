/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen } from '@testing-library/react'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  test('open', () => {
    const handleClose = vi.fn()

    const { rerender } = render(
      <Dialog open={true} onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>
    )
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce()
    expect(screen.getByText('Dialog Content')).toBeInTheDocument()

    rerender(
      <Dialog onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>
    )
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce()
  })
})
