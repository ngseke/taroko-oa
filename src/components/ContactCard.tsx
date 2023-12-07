import { Button } from './Button'
import { Card } from './Card'
import { LabelText } from './LabelText'

function ContactCardMeta (
  { label, value }: Partial<Record<'label' | 'value', string>>
) {
  return (
    <div className="flex gap-2 text-sm">
      <LabelText>{label}: </LabelText>
      <span>{value}</span>
    </div>
  )
}

export interface ContactCardProps {
  name?: string
  job?: string
  description?: string

  onClickEdit?: () => void
  onClickDelete?: () => void
}

export function ContactCard ({ name, job, description, onClickEdit, onClickDelete }: ContactCardProps) {
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${name}
  `

  return (
    <Card>
      <div className="grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] gap-4 md:grid-cols-[auto,1fr]">
        <div className="flex items-center gap-2">
          <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="font-bold">{name}</span>
        </div>

        <div className="flex flex-none flex-col gap-2 md:row-span-2">
          <Button onClick={onClickEdit}>Edit</Button>
          <Button color="danger" onClick={onClickDelete}>Delete</Button>
        </div>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <ContactCardMeta label="Job" value={job} />
          <ContactCardMeta label="Description" value={description} />
        </div>
      </div>
    </Card>
  )
}
