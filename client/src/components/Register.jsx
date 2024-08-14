import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    surName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    tc: false, // Add a state for the terms and conditions checkbox
    photo: null 
  });

  const changeHandler = (e) => {
    if(e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData({ 
        ...formData,
        photo: file
      });
    }
    else if (e.target.name === "tc") {
      setFormData({ 
        ...formData, 
        tc: e.target.checked 
      });
    }
    else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, surName, gender, email, password, confirmPassword, photo, tc } = formData;

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append('name', `${firstName} ${lastName} ${surName}`);
    data.append('email', email);
    data.append('password', password);
    data.append('confirmPassword', confirmPassword);
    data.append('gender', gender);
    data.append('tc', tc);
    if (photo) {
      data.append('image', photo);
    }

    try {
      const response = await axios.post("http://127.0.0.5:5000/api/users/sign-up", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data); 
      alert("Data Stored in Database");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h3 className="text-3xl font-semibold text-center mb-6">Register</h3>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={changeHandler}
          placeholder="First Name"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={changeHandler}
          placeholder="Last Name"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="surName"
          value={formData.surName}
          onChange={changeHandler}
          placeholder="Surname"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />

        <label className='mr-4'>Gender: </label>
        <input
          type="radio"
          name="gender"
          id='male'
          value="male"
          checked={formData.gender === "male"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="male" className="mr-4">Male</label> 
        <input
          type="radio"
          name="gender"
          id='female'
          value="female"
          checked={formData.gender === "female"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="female" className='mr-4'>Female</label>
        <input
          type="radio"
          name="gender"
          id='others'
          value="others"
          checked={formData.gender === "others"}
          onChange={changeHandler}
          className='mr-2'
        />
        <label htmlFor="others">Others</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
          className="w-full mt-4 mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Password"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={changeHandler }
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />

        <input
          type="file"
          name="photo"
          onChange={changeHandler}
          className="w-full mb-4 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="tc"
            id="tc"
            checked={formData.tc}
            onChange={changeHandler}
            className="mr-2"
          />
          <label htmlFor="tc">I agree to the terms and conditions</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
      </div>
    </div>
  );
}

export default Register;
