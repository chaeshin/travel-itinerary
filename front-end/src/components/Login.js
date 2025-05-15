import { useRef } from "react";

const Login=({setCurrUser, setShow})=>{
  const formRef = useRef()
  const login = async (userInfo, setCurrUser)=>{
    const url = "http://localhost:3001/login"  // Update port to 3001
    try{
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if(!response.ok) throw data.console.error
      localStorage.setItem('token', response.headers.get("Authorization"))
      setCurrUser(data)
    } catch(error){
        console.log("error", error)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
      "user" : { email: data.email, password: data.password }
    }
    login(userInfo, setCurrUser)
    e.target.reset()
  }
  const handleClick = e => {
      e.preventDefault()
      setShow(false)
  }
  return(
      <div>
          <h1>Login</h1>
          <form ref={formRef} onSubmit={handleSubmit}>
              Email: <input type="email" name="email" placeholder="email" required />
              <br/>
              Password: <input type="password" name="password" placeholder="password" required />
              <br/>
              <button type="submit">Login</button>
          </form>
          <br/>
          <div>Don't have an account? <a href="#signup" onClick={handleClick}>Signup</a></div>
      </div>
  )
}
export default Login
