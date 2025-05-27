import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const login = async (userInfo) => {
    try {
      const response = await fetch("http://localhost:3001/login", { // Changed port to 3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (response.ok && data.token) { // Changed logic to check for successful response
        localStorage.setItem('token', data.token);
        setCurrUser(data.user);
        console.log('Login successful, navigating to trips');
        navigate('/trips');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password
      }
    };
    login(userInfo);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
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
        <a href="#signup" onClick={(e) => {
          e.preventDefault();
          setShow(false);
        }}>Signup</a>
      </div>
    </div>
  );
};

export default Login;
