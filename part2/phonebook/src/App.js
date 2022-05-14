import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import NotificationError from './components/NotificationError'

import axios from 'axios'

import personeService from './services/persones'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [successfully, setSucessfuly] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personeService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    let changeNewName = true
    for (const person of persons) {
      if (person.name === newName) {
        changeNewName = false
        const changedPerson = { ...person, number: newPhone }

        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one`)) {
          personeService
            .update(person.id, changedPerson)
            .then(returnedPersone => {
              setPersons(persons.map(p => p.id != person.id ? p : returnedPersone))
              successfullyMessage('Update', returnedPersone.name)
            })
            .catch(error => {
              setErrorMessage(
                `Information of '${person.name}' was already deleted from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            })
        }
      }
      setNewName('')
      setNewPhone('')
    }

    if (changeNewName) {
      const personObject = {
        name: newName,
        number: newPhone
      }
      personeService
        .create(personObject)
        .then(returnedPersone => {
          setPersons(persons.concat(returnedPersone))
          setNewName('')
          setNewPhone('')
          successfullyMessage('Add', returnedPersone.name)
        })
    } else {
    }
  }

  const removePersoneOn = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personeService
        .remove(id)
        .then(returnedPersone => {
          if (returnedPersone === 200) {
            setPersons(persons.filter(p => p.id !== id))
          }
        })
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

  const personsShow = persons.filter(person => {
    return (
      person.name.toLocaleLowerCase().search(newFilterName.toLocaleLowerCase()) == 0
    )

  })
  
  const successfullyMessage = (text, name) => {
    setSucessfuly(`${text} ${name}`)
    setTimeout(() => {
      setSucessfuly(null)
    }, 5000)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfully} />
      <NotificationError message={errorMessage} />
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

      <Persons
        personsShow={personsShow}
        removePersoneOn={removePersoneOn}
      />
    </div>
  )
}

export default App
