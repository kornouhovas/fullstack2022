import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const StaticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  if (props.staticAll === 0) {
    return (
      <div>
        <p>No feetback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <p></p>
          <table>
            <tbody>
              <StaticLine text='good' value={props.staticGood} />
              <StaticLine text='neutral' value={props.staticNeutral} />
              <StaticLine text='bad' value={props.staticBad} />
              <StaticLine text='all' value={props.staticAll} />
              <StaticLine text='average' value={props.staticAverage} />
              <StaticLine text='positive' value={props.staticPositive} />
            </tbody>
          </table>
      </div>
    )
  }
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good + bad*-1) / (good + neutral + bad)
  const positive = good / (good + neutral + bad) * 100

  return (
    <div>
      <Header text='give feetback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistic
        staticGood={good}
        staticNeutral={neutral}
        staticBad={bad}
        staticAll={good + neutral + bad}
        staticAverage={average}
        staticPositive={positive + ' %'}
      />
    </div>
  )
}

export default App

