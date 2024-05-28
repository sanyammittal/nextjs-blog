"use client";
import { useRef, useState } from "react";
import classes from "../page.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState("password");
  const [wrongData, setWrongData] = useState(false);
  const navigate = useRouter();

  const showPasswordHandler = (event) => {
    event.target.checked
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  const createAccountHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate.push(`/${user.uid}`);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        event.target.reset();
        setShowPassword("password");
      })
      .catch((err) => {
        setWrongData(true);
      });
  };

  const inputFocusHandler = () => {
    setWrongData(false);
  };

  return (
    <div className={classes.container}>
      <h1>Create Account</h1>
      <form onSubmit={createAccountHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          ref={emailRef}
          className={!wrongData ? classes.input : classes.wrongInput}
          onFocus={inputFocusHandler}
        />
        {wrongData && <p className={classes.errorText}>Invalid Email!!</p>}
        <label htmlFor="password">Password</label>
        <input
          type={showPassword}
          required
          ref={passwordRef}
          className={!wrongData ? classes.input : classes.wrongInput}
          onFocus={inputFocusHandler}
        />
        {wrongData && <p className={classes.errorText}>Invalid Password!!</p>}
        <input type="checkbox" onChange={showPasswordHandler} /> Show Password
        <input type="submit" value="SIGNUP" />
      </form>
    </div>
  );
}
