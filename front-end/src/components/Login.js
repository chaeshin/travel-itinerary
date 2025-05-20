import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login=({setCurrUser, setShow}) => {
  const formRef = useRef();
  const navigate = useNavigate();


  const login = async (userInfo) => {
    const url = "http://localhost:3001/login";  // Update port to 3001
    try{
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json()
      if(!response.ok) throw new Error(data.error);

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      setCurrUser(data.user);
      navigate('/trips');  // Redirect to trips page after successful login
    } catch(error) {
        console.error("Login error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user : {
        email: data.email,
        password: data.password
      }
    };
    login(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
      e.preventDefault();
      setShow(false);
  };

  return(
    <div className="login-container">
      <h1>Login</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          Email:
          <input
            type="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div className="form-group">
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account?
        <a href="#signup" onClick={handleClick}>Signup</a>
      </div>
    </div>
  );
};

export default Login
