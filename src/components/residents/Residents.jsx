import "./Residents.css";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { BACKEND_URL } from "../../App";

export default function Residents() {
  const flat_id = JSON.parse(localStorage.getItem("residents_flat_id"));

  const [residents, setResidents] = useState([]);

  useEffect(fetchResidents, []);

  function fetchResidents() {
    getResidents();
  }

  async function getResidents() {
    try {
      let res = await fetch(`${BACKEND_URL}/residents/${flat_id}`);
      let res_data = await res.json();
      setResidents(res_data);
    } catch (error) {
      console.log(error);
    }
  }

  const [residentDetail, setResidentDetail] = useState({
    name: "",
    age: "",
    gender: "none",
    flat_id: flat_id,
  });

  function handleChange(e) {
    setResidentDetail({ ...residentDetail, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveResident();
  }

  async function saveResident() {
    try {
      await fetch(`${BACKEND_URL}/residents`, {
        method: "POST",
        body: JSON.stringify(residentDetail),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Added New Resident Successfully!");
      getResidents();
      //   Make Form field Empty
      setResidentDetail({
        name: "",
        age: "",
        gender: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="container" style={{ marginTop: "10px" }}>
      {/* showing residents details */}
      <div className="showResidents">
        <Typography variant="h6" className="head">
          Resident Details
        </Typography>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => {
              return (
                <tr key={resident._id} id={resident._id}>
                  <td>{resident.name}</td>
                  <td>{resident.age}</td>
                  <td>{resident.gender}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* option to add resident to selected flat */}
      <form
        onSubmit={handleSubmit}
        id="residentForm"
        // style={{ marginTop: "5px" }}
      >
        <h2>Add Resident to this flat</h2>

        <input
          type="text"
          id="name"
          className="newResident"
          value={residentDetail.name}
          placeholder="enter resident name"
          onChange={handleChange}
        />

        <input
          type="number"
          id="age"
          className="newResident"
          value={residentDetail.age}
          placeholder="enter resident age"
          onChange={handleChange}
        />

        <select
          id="gender"
          className="newResident"
          value={residentDetail.gender}
          onChange={handleChange}
        >
          <option value="none">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {/* 
        <input
          type="submit"
          className="newResident"
          value="Add Resident"
        /> */}
        <Button onClick={(e) => handleSubmit(e)} variant="contained">
          Add Resident
        </Button>
      </form>
    </div>
  );
}
