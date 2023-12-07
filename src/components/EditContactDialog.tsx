import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { fetchContact } from '../modules/apis'
import { useEffect, useState } from 'react'
import { useEditContact } from '../hooks/useEditContact'
import { LoadingIcon } from './LoadingIcon'

export interface EditContactDialogProps {
  contactId: number | null
  onClose: () => void
  onSuccess: () => void
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
    resetContactDraft,
  } = useContactDraft()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!contactId) {
      resetContactDraft()
      return
    }

    ;(async () => {
      setIsLoading(true)
      const contact = await fetchContact(contactId)
      initiateContactDraft(contact)
      setIsLoading(false)
    })()
  }, [contactId, initiateContactDraft, resetContactDraft])

  const { submit, isSubmitting } = useEditContact()

  async function handleSubmit () {
    if (!contactId) {
      throw new Error('Missing `contactId` or `contactDraft`!')
    }

    await submit(contactId, contactDraft)

    onClose?.()
    onSuccess?.()
  }

  return (
    <Dialog
      title="Edit Contact"
      open={Boolean(contactId)}
      onClose={onClose}
    >
      {
        isLoading
          ? <LoadingIcon />
          : <ContactForm
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
