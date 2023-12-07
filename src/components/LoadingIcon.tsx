import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function LoadingIcon () {
  return (
    <FontAwesomeIcon icon={faSpinner} spin />
  )
}
