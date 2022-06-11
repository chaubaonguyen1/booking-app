import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT } from "../../features/auth/authSlice";
export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("dates");
    dispatch(LOG_OUT());
  }
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <h1 className="logo">Booking</h1>
        </Link>
        {!user ? (
          <div className="navItem">
            <button className="navButton">Register</button>
            <Link to="/login"><button className="navButton">Log in</button></Link>
          </div>
        ) : (
          <div className="navItem">
            <span>Hello {user.others.username}</span>
            <button onClick={handleLogOut} className="navButton">Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}
