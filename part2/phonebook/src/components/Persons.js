import React from "react"

const Persons = ({ personsShow }) => {
  console.log(personsShow)
  return (
    personsShow.map(person =>
      <Person
        key={person.name}
        person={person}
      />
    )

  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.phone}</div>
  )
}

export default Persons