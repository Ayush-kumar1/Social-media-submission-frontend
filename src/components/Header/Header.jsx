import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useMedia } from "../../MediaContext";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
function Header() {
  const { state, dispatch } = useMedia();
  let navigate = useNavigate();

  function nav() {
    if (state) {
      return [
        <Link to="profile">
          <h3>Profile</h3>
        </Link>,
        <Link to="/createpost">
          <h5> ➕</h5>
        </Link>,

        <Link to="/login">
          <h3
            onClick={() => {
              localStorage.clear();

              dispatch({ type: "CLEAR" });
            }}
          >
            
            <Button  variant="contained"
          color="secondary">Logout</Button>
          </h3>
        </Link>,
        <Link to="subscribepost"><h6>Subscriber's post</h6></Link>
      ];
    } else {
      return [
        <Link to="login">
          <h3>Login</h3>
        </Link>,
        <Link to="signup">
          <h3>Signup</h3>
        </Link>,
      ];
    }
  }
  return (
    <div className="nav">
      <div className="Header_content">
        <div>
          <Link to={state ? "/" : "login"}>
            <h4 className="brand-logo">Chit-Chat😉</h4>
          </Link>
        </div>

        <div style={{ display: "flex", gap: "1rem" }} className="Header-links">
          {nav()}
        </div>
      </div>
    </div>
  );
}

export default Header;
