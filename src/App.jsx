import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { AllRoutes } from "./components/AllRoutes/AllRoutes";
import {
  Stack,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const BACKEND_URL = "https://apartment-manager-dkjaiswal77.herokuapp.com";
export { BACKEND_URL };

function App() {
  const navigate = useNavigate();

  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

  return (
    <>
      <Stack spacing={5} direction="row" style={{ justifyContent: "space-around", backgroundColor: "teal", padding: "1rem" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Home
          </Button>
        </Link>
        <Link to={"/addflat"} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Add Flat
          </Button>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            onClick={() => {
              if (isLoggedIn) {
                // logout
                localStorage.removeItem("isLoggedIn");
                navigate("/login");
              } else {
                navigate("/login");
              }
            }}
            color="error"
            startIcon={<SendIcon />}
          >
            {isLoggedIn ? "Signout" : "Signin"}
          </Button>
        </Link>
      </Stack>
      <AllRoutes />
    </>
  );
}

export default App;
