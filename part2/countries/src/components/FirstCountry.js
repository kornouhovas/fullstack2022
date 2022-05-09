import React, { useEffect, useState } from "react"
import axios from "axios"

import WeatherShow from "./WeatherShow"

const FirstCountry = ({ country, api_key, weather, setWeather }) => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p></p>
            capital {country.capital[0]} <br />
            area {country.area}
            <p></p>
            languages:
            <p></p>
            <ul>
                {(Object.values(country.languages)).map(language => {
                    return (
                        <Language key={language} language={language} />
                    )
                })}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <WeatherShow
                country={country}
                weather={weather}
            />
        </div>
    )
}

const Language = ({ language }) => {
    return (
        <div>
            <li>
                {language}
            </li>
        </div>
    )
}

export default FirstCountry