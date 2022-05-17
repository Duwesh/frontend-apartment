import "./main.css";
import { Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import updateFlatsAction from "../../redux/updateFlats/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { BACKEND_URL } from "../../App";

export default function Main() {
  const navigate = useNavigate();

  let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;
  if (!loginStatus) {
    navigate("/login");
  }

  const dispatch = useDispatch();

  let flats = useSelector((state) => state.flats.flats);

  //Loading Indicator
  const [loading, setLoading] = useState(true);

  console.log(flats);

  const page = useRef(1);

  const [updatedFlats, setupdatedFlats] = useState(null);

  let displayFlats;
  if (updatedFlats === null) {
    displayFlats = flats;
  } else {
    displayFlats = updatedFlats;
  }

  async function getFlats(page) {
    try {
      let res = await fetch(`${BACKEND_URL}/flats/${page}`);
      let flats = await res.json();
      console.log("getflats called");
      setLoading(false);
      // dispatch action
      dispatch(updateFlatsAction(flats));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log("useeffect")
    getFlats(page.current);
  }, []);

  //Pagination
  function moveToNextPage(e) {
    console.log(e.target.id);
    if (e.target.id === "prevPage") {
      alert("Prev Page");
      page.current = page.current - 1;
      getFlats(page.current);
    } else if (e.target.id === "nextPage") {
      alert("Next Page");
      page.current = page.current + 1;
      console.log(page.current);
      getFlats(page.current);
    }
  }

  //Filtering All Resident Data
  function filterByResidentType(e) {
    if (e.target.value === "all") {
      setupdatedFlats([...flats]);
    } else if (e.target.value === "owner") {
      setupdatedFlats(
        flats.filter((flat) => flat.flat_type === e.target.value)
      );
    } else {
      setupdatedFlats(
        flats.filter((flat) => flat.flat_type === e.target.value)
      );
    }
  }

  //Sorting Flats In ASC and DESC Order
  function sortByFlatNo(e) {
    if (e.target.value === "asc") {
      flats.sort((first, second) => +first.flat_no - +second.flat_no);
      setupdatedFlats([...flats]);
    } else if (e.target.value === "desc") {
      flats.sort((first, second) => +second.flat_no - +first.flat_no);
      setupdatedFlats([...flats]);
    }
    console.log("Flats Data", flats);
  }

  const [search, setSearch] = useState("");

  //search by name
  function handleChange(e) {
    setSearch(e.target.value.trim());
  }

  function searchByBlock(e) {
    e.preventDefault();
    console.log("search term", search);
    if (search.length == 0) {
      alert("Please Type sometime to search!");
      getFlats(page.current);
      return;
    }
    alert("Searching...");
    let newFlats = flats.filter((flat) => flat.block_name.startsWith(search));
    console.log(newFlats.length)
    if(newFlats.length === 0){
      alert("No Matching Flat name");
      return;
    }
    setupdatedFlats(newFlats);
    setSearch("");
  }

  function editFlatPage(e) {
    const editFlat_id = e.target.parentNode.parentNode.id;
    const [editFlat] = flats.filter((flat) => flat._id === editFlat_id);
    localStorage.setItem("editFlat", JSON.stringify(editFlat));
    navigate("/editFlat");
  }

  function editResidentPage(e) {
    const residents_flat_id = e.target.parentNode.parentNode.id;
    localStorage.setItem(
      "residents_flat_id",
      JSON.stringify(residents_flat_id)
    );
    navigate("/residents");
  }

  return (
    <div style={{ backgroundColor: "dodgerblue" }}>
      {/* filter By Categories*/}
      <div id="filter_sort_search">
        <div>
          <Typography variant="h6">Filter by resident type</Typography>
          {/* <label htmlFor="filterByResidentType">Filter by resident type</label> */}
          <select id="filterByResidentType" onChange={filterByResidentType}>
            <option value="all">Show All</option>
            <option value="tenant">tenant</option>
            <option value="owner">owner</option>
          </select>
        </div>

        {/* search */}
        <form onSubmit={searchByBlock}>
          <input
            type="text"
            id="search"
            placeholder="Search By Block Name..."
            onChange={handleChange}
          />
          <Button
            variant="contained"
            size="small"
            color="secondary"
            maxLength={1}
            onClick={(e) => searchByBlock(e)}
          >
            {/* <input type="submit" value="Search" padding="1rem" /> */}
            Submit
          </Button>
        </form>

        {/* sorting */}
        <div>
          {/* <label htmlFor="sortByFlatNo">Sort by flat no.</label> */}
          <Typography variant="h6" style={{ display: "inlineBlock" }}>
            Sort By Flat No.
          </Typography>
          <select id="sortByFlatNo" onChange={sortByFlatNo}>
            <option value="none">Sort Items</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* Flat Items in Tablular Format  */}
      <div>
        {loading && (
          <CircularProgress
            color="error"
            style={{
              // display: "inline-block",
              position: "absolute",
              left: "50%",
              top: "60%",
              transform: "transelate(-50%, -50%)",
              // margin: "0 auto",
            }}
          />
        )}
      </div>
      <table id="displayFlats">
        <thead>
          <tr>
            <th>Flat Type</th>
            <th>Block</th>
            <th>Flat No.</th>
            <th>Residents Total</th>
          </tr>
        </thead>
        <tbody>
          {displayFlats.map((flat) => {
            return (
              <tr key={flat._id} id={flat._id}>
                <td>{flat.flat_type}</td>
                <td>{flat.block_name}</td>
                <td>{flat.flat_no}</td>
                <td>{flat.total_resident}</td>
                <td>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={editFlatPage}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={editResidentPage}
                  >
                    Residents
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Stack
        direction="row"
        style={{
          backgroundColor: "dodgerblue",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <ButtonGroup
          variant="contained"
          size="small"
          spacing={2}
          style={{ justifyContent: "center" }}
          color="secondary"
          aria-label="alignment button group"
        >
          <Button
            style={{ marginRight: "5px" }}
            size="large"
            id="prevPage"
            onClick={(e) => {
              if (page.current > 1) {
                moveToNextPage(e);
              }
            }}
          >
            Prev
          </Button>
          <Button onClick={moveToNextPage} size="large" id="nextPage">
            Next
          </Button>
        </ButtonGroup>
      </Stack>
    </div>
  );
}
