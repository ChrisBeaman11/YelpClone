// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";



function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
 const demoSignIn = (e) => {
    e.preventDefault();
   dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'})).then(closeModal);
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
    <div className="loginModal">
      <h1>Log In</h1>
      <form className= "loginForm"onSubmit={handleSubmit}>

          <input
          placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button className="loginButton" disabled={credential.length<4 || password.length<6}type="submit">Log In</button>
        <button onClick={demoSignIn} className="demoUserButton">Continue as demo user</button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
