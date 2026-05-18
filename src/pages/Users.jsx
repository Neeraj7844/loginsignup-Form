import React, {

  useEffect,
  useState

} from "react";

import { useNavigate } from "react-router-dom";

import "./../styles/Users.css";

function Users() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    } else {

      fetchUsers();

    }

  }, []);

  const fetchUsers = async () => {

    try {

      const response = await fetch(

        "http://localhost:5000/users"

      );

      const result = await response.json();

      setUsers(result);

    } catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="users-container">

      <h1>All Users</h1>

      <button onClick={logout}>

        Logout

      </button>

      {

        users.map((item) => (

          <div
            className="user-card"
            key={item._id}
          >

            <p>{item.name}</p>

            <p>{item.email}</p>

          </div>

        ))
      }

    </div>

  );

}

export default Users;