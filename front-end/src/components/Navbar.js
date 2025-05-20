import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ currUser, setCurrUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    setCurrUser(null)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Perfect Itinerary</Link>
      </div>
      <div className="navbar-auth">
        {currUser ? (
          <>
            <span>Welcome, {currUser.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/signup" className="auth-button">Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
