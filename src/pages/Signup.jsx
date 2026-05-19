import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./../styles/Home.css";

function Signup() {

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

    try {

      const response = await fetch(

        "https://fullstack-3-sqha.onrender.com/register",

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

      alert(result.message);

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError("Something went wrong");

    }

  };

  return (

    <div className="container">

      <div className="form-box">

        <h1>Signup</h1>

        {error && <p className="error">{error}</p>}

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

            Signup

          </button>

        </form>

        <p>

          Already have account ?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;