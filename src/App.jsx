import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { AllRoutes } from "./components/AllRoutes/AllRoutes";
import { Stack, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CabinIcon from '@mui/icons-material/Cabin';

const BACKEND_URL = "https://apartment-manager-dkjaiswal77.herokuapp.com";
// const BACKEND_URL = "https://git.heroku.com/masai-appartment";
export { BACKEND_URL };

function App() {
  const navigate = useNavigate();

  //Getting user login status through localstorage
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;

  return (
    <>
      <Stack
        spacing={5}
        direction="row"
        style={{
          justifyContent: "space-around",
          backgroundColor: "teal",
          padding: "5px",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CabinIcon />}
          >
            Home
          </Button>
        </Link>
        <Link to={"/addflat"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<AddCircleIcon />}
          >
            Add Flat
          </Button>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            onClick={() => {
              if (loginStatus) {
                // logout
                localStorage.removeItem("loginStatus");
                navigate("/login");
              } else {
                navigate("/login");
              }
            }}
            color="error"
            endIcon={<SendIcon />}
          >
            {loginStatus ? "Signout" : "Signin"}
          </Button>
        </Link>
      </Stack>
      <AllRoutes />
    </>
  );
}

export default App;
