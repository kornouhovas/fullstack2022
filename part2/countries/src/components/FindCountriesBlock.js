import React from "react"

const FindCountriesBlock = ({ findCountries, handleFindCountries }) => {
    return (
        <div>
            find countries
            <input
                value={findCountries}
                onChange={handleFindCountries}
            />
        </div>
    )
}

export default FindCountriesBlock