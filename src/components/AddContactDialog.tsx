import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { useAddContact } from '../hooks/useAddContact'
import { useEffect } from 'react'

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

  async function handleSubmit () {
    await submit(contactDraft)

    onClose?.()
    onSuccess?.()
  }

  return (
    <Dialog title="Add Contact" open={open} onClose={onClose}>
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
