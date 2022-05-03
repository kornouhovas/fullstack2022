import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>

  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises
  }, 0)
  return (
    <p>total of {total} exercises</p>
  )
}

export default Course