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

  useEffect(() => {
    if (!contactId) {
      resetContactDraft()
      setContactError(undefined)
      setSubmitError(undefined)
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
  }, [contactId, initiateContactDraft, resetContactDraft])

  const { submit, isSubmitting } = useEditContact()
  const [submitError, setSubmitError] = useState<string>()

  async function handleSubmit () {
    try {
      if (!contactId) throw new Error('Missing `contactId`!')
      await submit(contactId, contactDraft)
      onClose?.()
      onSuccess?.()
    } catch (err) {
      setSubmitError(extractErrorMessage(err))
    }
  }

  return (
    <Dialog
      title="Edit Contact"
      open={Boolean(contactId)}
      onClose={onClose}
    >
      {<ErrorMessage>{contactError}</ErrorMessage>}
      {<ErrorMessage>{submitError}</ErrorMessage>}

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
