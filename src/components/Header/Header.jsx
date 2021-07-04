import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearAction } from "../../action/userAction";
function Header() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const User = useSelector((state) => state.User);
  const { state } = User;

  function nav() {
    if (state) {
      return [
        <Link to="profile">
          <h3>Profile</h3>
        </Link>,
        <Link to="subscribepost">
          <h6>Subscriber's post</h6>
        </Link>,

        <Link to="/login">
          <h3
            onClick={() => {
              localStorage.clear();

              dispatch(ClearAction());
            }}
          >
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </h3>
        </Link>,
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
          <Link to={state ? "/home" : "login"}>
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
