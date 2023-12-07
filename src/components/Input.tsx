import { LabelText } from './LabelText'

interface InputProps {
  value?: string
  label?: string
  disabled?: boolean
  onChange?: (value: string) => void
}

export function Input ({ value, label, disabled, onChange }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      <LabelText>{label}</LabelText>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-1 disabled:opacity-50"
        disabled={disabled}
      />
    </label>
  )
}
