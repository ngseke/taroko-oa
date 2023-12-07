import { type ContactDraft } from '../types/Contact'
import { Button } from './Button'
import { Input } from './Input'

export interface ContactFormProps {
  draft: ContactDraft
  onChangeDraft: (draft: ContactDraft) => void
  onSubmit: () => void
  onCancel: () => void
  loading?: boolean
  disabled?: boolean
}

export function ContactForm ({
  draft,
  onChangeDraft,
  onSubmit,
  onCancel,
  loading,
  disabled,
}: ContactFormProps) {
  function handleChange (field: keyof ContactDraft) {
    return function (newValue: string) {
      const newDraft = { ...draft, [field]: newValue }
      onChangeDraft(newDraft)
    }
  }

  const isSomeFiledEmpty = Object.values(draft)
    .some(value => !value.trim())

  const isFieldDisabled = Boolean(loading) || Boolean(disabled)

  const isSubmitButtonDisabled = Boolean(loading) || Boolean(disabled) || isSomeFiledEmpty

  return (
    <form className="grid grid-cols-2 gap-4">
      <div className="col-span-2 sm:col-span-1">
        <Input
          label="First Name"
          value={draft.firstName}
          onChange={handleChange('firstName')}
          disabled={isFieldDisabled}
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Input
          label="Last Name"
          value={draft.lastName}
          onChange={handleChange('lastName')}
          disabled={isFieldDisabled}
        />
      </div>

      <div className="col-span-2">
        <Input
          label="Job"
          value={draft.job}
          onChange={handleChange('job')}
          disabled={isFieldDisabled}
        />
      </div>

      <div className="col-span-2">
        <Input
          label="Description"
          value={draft.description}
          onChange={handleChange('description')}
          disabled={isFieldDisabled}
        />
      </div>

      <div className="col-span-2 flex justify-end gap-2">
        <Button onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitButtonDisabled}
          loading={loading}
        >Submit</Button>
      </div>
    </form>
  )
}
