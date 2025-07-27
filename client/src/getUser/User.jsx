import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import AddUser from "../addUser/AddUser";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1826/api/user");
        setUsers(response.data);
      } catch (error) {
        console.log(`error while fetching data ${error}`);
      }
    };

    fetchData();
  }, []);
  console.log(users);
  return (
    <div>
      <div className="userTable ">
        <h1>Create User</h1>
        <Link to="/add" type="button" className="btn btn-primary">
          Add User <i className="fa-solid fa-user-plus"></i>
        </Link>
        <table className="table table-dark table-bordered text-center mt-3">
          <thead>
            <tr>
              <th scope="col">S. No</th>
              <th scope="col">name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Operaions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="operationButtons">
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button type="button" className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
