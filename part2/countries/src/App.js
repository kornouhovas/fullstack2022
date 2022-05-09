import { useState, useEffect } from 'react'
import axios from 'axios'

import ShowContries from './components/ShowCountries'
import FindCountriesBlock from './components/FindCountriesBlock'

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFindCountries = (event) => {
    setFindCountries(event.target.value)
  }

  const countriesShow = countries.filter((country) => {
    return (
      country.name.common.toLocaleLowerCase()
        .search(findCountries.toLocaleLowerCase()) !== -1
    )
  })

  return (
    <div>
      <FindCountriesBlock
        findCountries={findCountries}
        handleFindCountries={handleFindCountries}
      />
      <ShowContries
        countriesShow={countriesShow}
        setFindCountries={setFindCountries}
        api_key={api_key}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App
