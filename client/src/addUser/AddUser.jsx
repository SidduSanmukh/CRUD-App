import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddUser.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const submitform = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1826/api/user", user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log("User is not created ", error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <h3>add user form</h3>
      <form action="" className="addUserForm" onSubmit={submitform}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            id="name"
            placeholder="Enter your name"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            onChange={inputHandler}
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            onChange={inputHandler}
            id="address"
            placeholder="Enter your address"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
