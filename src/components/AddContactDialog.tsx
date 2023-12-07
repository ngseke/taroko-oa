import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { useAddContact } from '../hooks/useAddContact'
import { useEffect } from 'react'
import { ErrorMessage } from './ErrorMessage'

export interface AddContactDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddContactDialog ({
  open,
  onClose,
  onSuccess,
}: AddContactDialogProps) {
  const { contactDraft, setContactDraft, resetContactDraft } = useContactDraft()

  const { submit, isSubmitting, submitError, clearSubmitError } = useAddContact()

  useEffect(() => {
    if (!open) {
      resetContactDraft()
      clearSubmitError()
    }
  }, [clearSubmitError, open, resetContactDraft])

  async function handleSubmit () {
    await submit(contactDraft)
    onClose?.()
    onSuccess?.()
  }

  return (
    <Dialog title="Add Contact" open={open} onClose={onClose}>
      {<ErrorMessage error={submitError} />}
      {
        contactDraft &&
          <ContactForm
            draft={contactDraft}
            onChangeDraft={setContactDraft}
            onSubmit={handleSubmit}
            onCancel={() => onClose?.()}
            loading={isSubmitting}
          />
      }
    </Dialog>
  )
}
