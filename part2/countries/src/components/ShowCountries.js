import React from "react"
import FirstCountry from "./FirstCountry"

const ShowContries = ({ countriesShow, setFindCountries, api_key, weather, setWeather }) => {
    if (countriesShow.length > 10) {
        return <div>To many matches, specify another filter</div>
    } else if (countriesShow.length === 1) {
        return (
            countriesShow.map(country => {
                return (
                    <FirstCountry
                        key={country.name.common}
                        country={country}
                        api_key={api_key}
                        weather={weather}
                        setWeather={setWeather}
                    />
                )
            })
        )
    } else {
        return (
            countriesShow.map(country => {
                return (
                    <Country
                        key={country.name.common}
                        country={country}
                        setFindCountries={setFindCountries}
                    />
                )
            })
        )
    }
}

const Country = ({ country, setFindCountries }) => {
    console.log(country)
    return (
        <div>
            {country.name.common}
            <button onClick={() => setFindCountries(`${country.name.common}`)}>show</button>
        </div>
    )
}


export default ShowContries