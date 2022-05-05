import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let changeNewName = true
    for (const person of persons) {
      if (person.name == newName) {
        changeNewName = false
      }
    }

    if (changeNewName) {
      const personObjecrt = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObjecrt))
      setNewName('')
      setNewPhone('')

    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterName = (event) => {
    setNewFilterName(event.target.value)

  }

  const personsShow = persons.filter((person) => {
    return (
      person.name.toLocaleLowerCase().search(newFilterName.toLocaleLowerCase()) == 0
    )
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newFilterName={newFilterName}
        handleFilterName={handleFilterName}
      />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>

      <Persons personsShow={personsShow} />

    </div>
  )
}

export default App
