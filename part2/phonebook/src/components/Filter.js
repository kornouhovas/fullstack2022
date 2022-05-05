import React from "react"

const Filter = ({ newFilterName, handleFilterName }) => {
  return (
    <div>
      filter show with
      <input
        value={newFilterName}
        onChange={handleFilterName}
      />
    </div>
  )
}

export default Filter
