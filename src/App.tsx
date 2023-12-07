import { Button } from './components/Button'
import { Navbar } from './components/Navbar'

export default function App () {
  return (
    <div className="container mt-6 px-4 pt-14">
      <Navbar
        actions={<Button>Add Contact</Button>}
      />
    </div>
  )
}
