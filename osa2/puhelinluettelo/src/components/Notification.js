import React from "react"

const Notification = ({ message, color }) => {

  const notificationStyle =  {
      color: color,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }

  if (message === null) {
      return null
  }
  
if (message.length > 0) {
    return (
      <div style = {notificationStyle} className="error">
        {message}
      </div>
    )
} else {
  return null
}
}

export default Notification