import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { fetchContact } from '../modules/apis'
import { useEffect } from 'react'
import { useEditContact } from '../hooks/useEditContact'

export interface EditContactDialogProps {
  contactId?: number | null
  onClose?: () => void
  onSuccess?: () => void
}

export function EditContactDialog ({
  contactId,
  onClose,
  onSuccess,
}: EditContactDialogProps) {
  const {
    contactDraft,
    setContactDraft,
    initiateContactDraft,
  } = useContactDraft()

  useEffect(() => {
    if (!contactId) {
      setContactDraft(null)
      return
    }

    fetchContact(contactId).then(initiateContactDraft)
  }, [contactId, initiateContactDraft, setContactDraft])

  const { submit, isSubmitting } = useEditContact()

  async function handleSubmit () {
    if (!contactId || !contactDraft) {
      throw new Error('Missing `contactId` or `contactDraft`!')
    }

    await submit(contactId, contactDraft)

    onClose?.()
    onSuccess?.()
  }

  return (
    <Dialog title="Edit Contact" open={Boolean(contactId)}>
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
