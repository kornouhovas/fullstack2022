import React from "react"

const Persons = ({ personsShow, removePersoneOn }) => {
  return (
    personsShow.map(person =>
      <Person
        key={person.name}
        person={person}
        removePersone={() => removePersoneOn(person.name, person.id)}
      />
    )

  )
}

const Person = ({ person, removePersone }) => {
  return (
    <div>{person.name} {person.number}
    <button onClick={removePersone}>delete</button>
    </div>

  )
}

export default Persons