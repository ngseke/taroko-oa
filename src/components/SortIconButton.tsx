import { type SortOrder } from '../modules/sort'
import { faArrowDownAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from './IconButton'

export interface SortIconButtonProps {
  sortOrder: SortOrder
  onClick: () => void
}

export function SortIconButton ({ sortOrder, onClick }: SortIconButtonProps) {
  const icon = sortOrder === 'asc' ? faArrowDownAZ : faArrowDownZA

  return (
    <IconButton onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </IconButton>
  )
}
