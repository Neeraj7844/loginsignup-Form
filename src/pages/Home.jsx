import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    pass: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (

      !formData.name ||

      !formData.email ||

      !formData.pass

    ) {

      setError("Please fill all fields");

      return;

    }

    try {

      const response = await fetch(

        "http://localhost:5000/register",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(formData)

        }

      );

      const result = await response.json();

      if (!response.ok) {

        setError(result.message);

        return;

      }

      localStorage.setItem("token", result.token);

      alert(result.message);

      setFormData({

        name: "",
        email: "",
        pass: ""

      });

    } catch (err) {

      console.log(err);

      setError("Something went wrong");

    }

  };

  return (

    <div className="container">

      <div className="form-box">

        <h1>JWT Authentication</h1>

        {
          error && <p className="error">{error}</p>
        }

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="pass"
            placeholder="Enter Password"
            value={formData.pass}
            onChange={handleChange}
          />

          <button type="submit">

            Register

          </button>

        </form>

        <button
          className="users-btn"
          onClick={() => navigate("/users")}
        >

          See Users

        </button>

      </div>

    </div>

  );

}

export default Home;