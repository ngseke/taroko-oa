import { type ContactDraft } from '../types/Contact'
import { Button } from './Button'
import { Input } from './Input'

export interface ContactFormProps {
  draft: ContactDraft
  onChangeDraft: (draft: ContactDraft) => void
  onSubmit: () => void
  onCancel: () => void
  loading?: boolean
}

export function ContactForm ({
  draft,
  onChangeDraft,
  onSubmit,
  onCancel,
  loading,
}: ContactFormProps) {
  function handleChange (field: keyof ContactDraft) {
    return function (newValue: string) {
      const newDraft = { ...draft, [field]: newValue }
      onChangeDraft(newDraft)
    }
  }

  const isSomeFiledEmpty = Object.values(draft)
    .some(value => !value.trim())

  const isSubmitButtonDisabled = Boolean(loading) || isSomeFiledEmpty

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
      <div className="col-span-2 sm:col-span-1">
        <Input
          label="First Name"
          value={draft.firstName}
          onChange={handleChange('firstName')}
          disabled={loading}
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Input
          label="Last Name"
          value={draft.lastName}
          onChange={handleChange('lastName')}
          disabled={loading}
        />
      </div>

      <div className="col-span-2">
        <Input
          label="Job"
          value={draft.job}
          onChange={handleChange('job')}
          disabled={loading}
        />
      </div>

      <div className="col-span-2">
        <Input
          label="Description"
          value={draft.description}
          onChange={handleChange('description')}
          disabled={loading}
        />
      </div>

      <div className="col-span-2 flex justify-end gap-2">
        <Button onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button
          type="submit"
          disabled={isSubmitButtonDisabled}
          loading={loading}
        >Submit</Button>
      </div>
    </form>
  )
}
