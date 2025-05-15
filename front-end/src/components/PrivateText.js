import { useState, useEffect } from 'react';
import { data } from 'react-router-dom';

const PrivateText = ({ currUser }) => {
  const [message, setMessage] = useState(null)
  const getText = async () => {
    try {
      const response = await fetch("http://localhost:3000/private/test", {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      if(!response.ok) throw console.error
      const data = await response.json()
      setMessage(data.message)
    }
    catch (error) {
      console.log("error", error)
      setMessage(data.message)
    }
  }
  useEffect(() => {
    if (currUser)
      getText()
    }, [currUser])
    return (
      <div>{message}</div>
    )
}
export default PrivateText
