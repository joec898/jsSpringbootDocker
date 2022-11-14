import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";
import { baseApiUrl } from '../config';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
      name: "",
      jobTitle: "",
      email: "",
      phone: "",
      imageurl: "",
    });

    const { name, jobTitle, email, phone, imageUrl } = user;

    const onInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const result = await axios.get(`${baseApiUrl}/all`);
      await axios.post(`${baseApiUrl}/add`, user);
      navigate("/");
    };

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">New User</h2>

              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Name
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your job title"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your e-mail address"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your image url"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link className="btn btn-outline-danger mx-2" to="/">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
}
