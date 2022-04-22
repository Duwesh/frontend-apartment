import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { BACKEND_URL } from "../../App";

export default function Register() {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setRegister({ ...register, [e.target.id]: e.target.value });
  }

  async function registerUser() {
    try {
      let res = await fetch(`${BACKEND_URL}/manager/register`, {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      let res_data = await res.json();
      // console.log(res_data);
      if (res_data.status) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Handling Submit For User Form
  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="register_form">
        <Typography variant="h4">Sign Up</Typography>
        <input
          type="text"
          id="name"
          className="newRegister"
          value={register.name}
          placeholder="enter name"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          className="newRegister"
          value={register.email}
          placeholder="enter email"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          className="newRegister"
          value={register.password}
          placeholder="enter password"
          onChange={handleChange}
        />

        <input type="submit" value="Sign Up" className="newRegister" />
      </form>
    </div>
  );
}
