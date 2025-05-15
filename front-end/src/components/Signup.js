import { useRef } from "react";

const Signup=({setCurrUser, setShow})=>{
    const formRef = useRef()
    const signup=async (userInfo, setCurrUser)=>{
        const url = "http://localhost:3000/signup"
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
    const handleSumit = e => {
      e.preventDefault()
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData)
      const userInfo = {
        "user" : { email: data.email, password: data.password }
      }
      signup(userInfo, setCurrUser)
      e.target.reset()
    }
    const handleClick = e => {
        e.preventDefault()
        setShow(true)
    }
    return(
        <div>
            <h1>Signup</h1>
            <form ref={formRef} onSubmit={handleSumit}>
                Email: <input type="email" name="email" placeholder="email" required />
                <br/>
                Password: <input type="password" name="password" placeholder="password" required />
                <br/>
                <button type="submit">Signup</button>
            </form>
            <br/>
            <div>Already have an account? <a href="#login" onClick={handleClick}>Login</a></div>
        </div>
    )
}

export default Signup
