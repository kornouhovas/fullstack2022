import React from "react"

const WeatherShow = ({ weather, country }) => {
    console.log(weather)
    if (Object.keys(weather).length > 0) {
        return (
            <div>
                <h1>Weather in {country.capital[0]}</h1>
                <p></p>
                temperature {weather.main.temp} Celsius<br />
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
                <br />wind {weather.wind.speed} m/s
            </div>
        )
    }
}

export default WeatherShow