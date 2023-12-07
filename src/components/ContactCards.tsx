import clsx from 'clsx'
import { type Contact } from '../types/Contact'
import { ContactCard } from './ContactCard'

export interface ContactCardsProps {
  contacts?: Contact[]
  disabled?: boolean
  onClickEdit?: (id: number) => void
  onClickDelete?: (id: number) => void
}

export function ContactCards ({
  contacts,
  disabled,
  onClickEdit,
  onClickDelete,
}: ContactCardsProps) {
  return <>
    <div
      className={clsx(
        'grid w-full grid-cols-1 gap-4 md:grid-cols-2',
        { 'opacity-50 pointer-events-none': disabled }
      )}
    >
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
    {
      !contacts?.length &&
        <div className="text-sm italic text-neutral-500">No Contact</div>
    }
  </>
}
