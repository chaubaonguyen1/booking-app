import './navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className="navContainer">
        <span className='logo'>Booking</span>
        <div className="navItem">
          <button className='navButton'>Register</button>
          <button className='navButton'>Log in</button>
        </div>
      </div>
    </div>
  )
}
