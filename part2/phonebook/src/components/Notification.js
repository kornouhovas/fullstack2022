import React from "react"

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

const messageStyle = {
    color: 'green',
    borderRadddius: 5,
    fontSize: 20,
    padding: 10,
    background: 'lightgrey',
    borderStyle: 'solid',
    marginBottom: 10
}

export default Notification