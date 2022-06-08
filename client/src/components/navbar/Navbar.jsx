import './navbar.css';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" style={{color: 'inherit', textDecoration: 'none', fontWeight: 'bold'}}>
        <h1 className='logo'>Booking</h1>
        </Link>
        <div className="navItem">
          <button className='navButton'>Register</button>
          <button className='navButton'>Log in</button>
        </div>
      </div>
    </div>
  )
}
