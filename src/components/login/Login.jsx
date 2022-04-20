import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { BACKEND_URL } from "../../App";

import { Button } from "@mui/material";

export default function Login() {
  const Navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setLogin({ ...login, [e.target.id]: e.target.value });
  }

  async function loginUser() {
    try {
      let res = await fetch(`${BACKEND_URL}/manager/login`, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res_data = await res.json();
      // console.log(res_data);
      if (res_data.status) {
        alert("Sign In Successfully!");
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
        id="login_form"
      >
        <Typography variant="h4">Sign In</Typography>

        <input
          type="email"
          id="email"
          className="login_entry"
          value={login.email}
          placeholder="Enter Your Email..."
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          className="login_entry"
          value={login.password}
          placeholder="Enter Your Password..."
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Log In"
          className="login_entry"
          onClick={() => loginUser()}
        />
        {/* <Button variant="contained" color="error">
          Sign In
        </Button> */}
        <Button
          onClick={(e) => {
            Navigate("/register");
          }}
          className="login_entry"
          variant="contained"
        >
          Create an account - Sign Up
        </Button>
      </form>
    </div>
  );
}
