import { Dialog } from './Dialog'
import { ContactForm } from './ContactForm'
import { useContactDraft } from '../hooks/useContactDraft'
import { fetchContact } from '../modules/apis'
import { useEffect, useState } from 'react'
import { useEditContact } from '../hooks/useEditContact'
import { LoadingIcon } from './LoadingIcon'
import { extractErrorMessage } from '../modules/extractErrorMessage'
import { ErrorMessage } from './ErrorMessage'

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
  const [contactError, setContactError] = useState<string>()

  const { submit, submitError, clearSubmitError, isSubmitting } = useEditContact()

  async function handleSubmit () {
    await submit(contactId, contactDraft)
    onClose?.()
    onSuccess?.()
  }

  useEffect(() => {
    if (!contactId) {
      resetContactDraft()
      setContactError(undefined)
      clearSubmitError()
      return
    }

    ;(async () => {
      setIsLoading(true)
      try {
        const contact = await fetchContact(contactId)
        initiateContactDraft(contact)
      } catch (err) {
        setContactError(extractErrorMessage(err))
      }
      setIsLoading(false)
    })()
  }, [clearSubmitError, contactId, initiateContactDraft, resetContactDraft])

  return (
    <Dialog
      title="Edit Contact"
      open={Boolean(contactId)}
      onClose={onClose}
    >
      {<ErrorMessage error={contactError} />}
      {<ErrorMessage error={submitError} />}

      {
        isLoading
          ? <LoadingIcon />
          : <ContactForm
              draft={contactDraft}
              onChangeDraft={setContactDraft}
              onSubmit={handleSubmit}
              onCancel={() => onClose?.()}
              loading={isSubmitting}
              disabled={Boolean(contactError)}
            />
      }
    </Dialog>
  )
}
