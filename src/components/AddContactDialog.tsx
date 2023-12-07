import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { useAddContact } from '../hooks/useAddContact'
import { useEffect, useState } from 'react'
import { extractErrorMessage } from '../modules/extractErrorMessage'
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

  useEffect(() => {
    if (!open) {
      resetContactDraft()
    }
  }, [open, resetContactDraft])

  const { submit, isSubmitting } = useAddContact()
  const [submitError, setSubmitError] = useState<string>()

  async function handleSubmit () {
    try {
      await submit(contactDraft)

      onClose?.()
      onSuccess?.()
    } catch (err) {
      setSubmitError(extractErrorMessage(err))
    }
  }

  return (
    <Dialog title="Add Contact" open={open} onClose={onClose}>
      {
        submitError &&
          <ErrorMessage>{submitError}</ErrorMessage>
      }
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
