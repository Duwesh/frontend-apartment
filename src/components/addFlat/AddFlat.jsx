import "./AddFlat.css";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { BACKEND_URL } from "../../App";

export default function AddFlat() {
  const [detail, setDetail] = useState({
    flat_type: "none",
    block: "",
    flat_no: "",
    residents_count: "",
  });

  function handleChange(e) {
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
        block: "",
        flat_no: "",
        residents_count: "0",
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
          id="block"
          className="newFlat"
          placeholder="enter block"
          value={detail.block}
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
          id="residents_count"
          className="newFlat"
          placeholder="enter no. of residents"
          value={detail.residents_count}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={() => saveFlat()}>
          Add New Flat
        </Button>
      </form>
    </div>
  );
}
