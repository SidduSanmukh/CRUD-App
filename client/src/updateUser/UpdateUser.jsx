import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1826/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`update user error : ${error}`);
      });
  }, [id]);

  const submitform = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:1826/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log("User is not created ", error);
      });
  };

  return (
    <div className="UpdateUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <h3>Update user form</h3>
      <form action="" className="addUserForm" onSubmit={submitform}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
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
            value={user.email}
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
            value={user.address}
            onChange={inputHandler}
            id="address"
            placeholder="Enter your address"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
