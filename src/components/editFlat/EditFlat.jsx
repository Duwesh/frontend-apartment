import "./EditFlat.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../../App";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditFlat() {
  let editFlat = JSON.parse(localStorage.getItem("editFlat"));
  console.log(editFlat);
  const navigate = useNavigate();
  let editFlat_details = {
    flat_type: editFlat.flat_type,
    block_name: editFlat.block_name,
    flat_no: editFlat.flat_no,
    total_resident: editFlat.total_resident,
  };

  const [detail, setDetail] = useState(editFlat_details);

  function handleChange(e) {
    // console.log(e.target.value);
    setDetail({ ...detail, [e.target.id]: e.target.value });
  }

  async function updateFlat() {
    try {
      await fetch(`${BACKEND_URL}/flats/${editFlat._id}`, {
        method: "PATCH",
        body: JSON.stringify(detail),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDetail({
        flat_type: "none",
        block_name: "",
        flat_no: "",
        total_resident: "",
      });
      alert("Flat Data Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      id="flat_container"
      style={{ marginTop: "10px", backgroundColor: "purple" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFlat();
        }}
      >
        <Typography variant="h6" className="head">
          Flat Update
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
          placeholder="Enter Your Block..."
          value={detail.block_name}
          onChange={handleChange}
        />

        <input
          type="text"
          id="flat_no"
          className="newFlat"
          placeholder="Enter Flat Number..."
          value={detail.flat_no}
          onChange={handleChange}
        />

        <input
          type="number"
          id="residents_count"
          className="newFlat"
          placeholder="Enter Total Residents..."
          value={detail.total_resident}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => updateFlat(e)}
        >
          Flat Update
        </Button>
      </form>
    </div>
  );
}
