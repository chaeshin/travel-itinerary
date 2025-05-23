const Logout = ({setCurrUser}) => {
  const logout = async (setCurrUser) => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: 'delete',
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
      })
      const data = await response.json()
      if (!response.ok) throw data.error
      localStorage.removeItem('token')
      setCurrUser(null)
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleClick = e => {
    e.preventDefault()
    logout(setCurrUser)
  }
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
export default Logout
