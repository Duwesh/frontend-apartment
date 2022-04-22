import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { BACKEND_URL } from "../../App";

import { Button } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

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
        localStorage.setItem("loginStatus", JSON.stringify(true));
        navigate("/");
      } else {
        alert("Please Check Email and Password!!");
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  }

  return (
    <div
      style={{ paddingTop: "10px", backgroundColor: "black", height: "700px" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
        id="loginForm"
      >
        <Typography
          variant="h4"
          style={{ color: "white", textAlign: "center" }}
        >
          Sign In
        </Typography>

        <input
          type="email"
          id="email"
          className="newLogin"
          value={login.email}
          placeholder="Enter Your Email..."
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          className="newLogin"
          value={login.password}
          placeholder="Enter Your Password..."
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="error"
          className="newLogin"
          onClick={(e) => loginUser(e)}
          endIcon={<ArrowCircleRightIcon />}
        >
          Sign In
        </Button>
        <Button
          onClick={(e) => {
            navigate("/register");
          }}
          className="newLogin"
          variant="contained"
          startIcon={<PersonAddAltIcon />}
        >
          Create an account - Sign Up
        </Button>
      </form>
    </div>
  );
}
