import "./AddFlat.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { BACKEND_URL } from "../../App";

export default function AddFlat() {
  const [detail, setDetail] = useState({
    flat_type: "none",
    block_name: "",
    flat_no: "",
    total_resident: 0,
  });

  function handleChange(e) {
    // console.log(detail.total_resident);
    setDetail({ ...detail, [e.target.id]: e.target.value.trim() });
  }

  async function saveFlat() {
    try {
      await fetch(`${BACKEND_URL}/flats`, {
        method: "POST",
        body: JSON.stringify(detail),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("New Flat Added Successfully!");
      setDetail({
        flat_type: "none",
        block_name: "",
        flat_no: "",
        total_resident: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      id="flatContainer"
      style={{ marginTop: "10px", backgroundColor: "purple" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveFlat();
        }}
      >
        <Typography variant="h6" className="head">
          Add Flat
        </Typography>
        <select
          id="flat_type"
          className="newFlat"
          value={detail.flat_type}
          onChange={handleChange}
        >
          <option value="none">Select Flat Type</option>
          <option value="owner">owner</option>
          <option value="tenant">tenant</option>
        </select>

        <input
          type="text"
          id="block_name"
          className="newFlat"
          placeholder="enter block name"
          value={detail.block_name}
          onChange={handleChange}
        />

        <input
          type="text"
          id="flat_no"
          className="newFlat"
          placeholder="enter flat number"
          value={detail.flat_no}
          onChange={handleChange}
        />

        <input
          type="number"
          id="total_resident"
          className="newFlat"
          placeholder="enter no. of residents"
          value={detail.total_resident}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={(e) => saveFlat(e)}>
          Add New Flat
        </Button>
      </form>
    </div>
  );
}
