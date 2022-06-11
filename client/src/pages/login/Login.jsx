import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // [e.target.id] to point at the tags which has id attribute
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    //e.preventDefault();
    dispatch(LOGIN_START());
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch(LOGIN_SUCCESS(res.data));
      navigate("/");
    } catch (err) {
      dispatch(LOGIN_FAILURE(err.response.data));
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authSelector.user));
  }, [authSelector.user]);

  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          onKeyDown={handleEnterKey}
          className="loginInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onKeyDown={handleEnterKey}
          onChange={handleChange}
          className="loginInput"
        />
        <button
          disabled={authSelector.loading}
          onClick={handleLogin}
          className="loginButton"
        >
          Login
        </button>
        <button className="loginButton">Don't have an account yet?</button>
      </div>
      {authSelector.error && (
        <span style={{ color: "red" }}>{authSelector.error}</span>
      )}
    </div>
  );
};
