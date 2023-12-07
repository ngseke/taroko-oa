import { type Contact } from '../types/Contact'
import { ContactCard } from './ContactCard'

export interface ContactCardsProps {
  contacts?: Contact[]
  onClickEdit?: (id: number) => void
  onClickDelete?: (id: number) => void
}

export function ContactCards ({
  contacts,
  onClickEdit,
  onClickDelete,
}: ContactCardsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {
        contacts?.map(contact => (
          <ContactCard
            key={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            job={contact.job}
            description={contact.description}
            onClickEdit={() => onClickEdit?.(contact.id)}
            onClickDelete={() => onClickDelete?.(contact.id)}
          />
        ))
      }
    </div>
  )
}
