import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard  as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

function randomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

// App
const App = () => {

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const handleClick = () => {
    return randomNumber(0, anecdotes.length)
  }

  const handleClickVote = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote)
  }

  const voteMost = () => {
    let vTemp = 0
    let vTemp2 = 0
    for (const v in vote) {
      if (vote[v] > vTemp) {
        vTemp = vote[v]
        vTemp2 = v
      }
    }
    return vTemp2
  }

  const mostVoteAnecdote = () => {
    return anecdotes[voteMost()]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br></br>
      <h>has {vote[selected]} votes</h>
      <p></p>
      <Button handleClick={handleClickVote} text='vote' />
      <Button handleClick={() => setSelected(handleClick)} text='next anecdote' />
      <h1>Anecdote whit most votes</h1>
      {mostVoteAnecdote()} <br></br>
      {vote[voteMost()]}
    </div>
  )
}

export default App;
