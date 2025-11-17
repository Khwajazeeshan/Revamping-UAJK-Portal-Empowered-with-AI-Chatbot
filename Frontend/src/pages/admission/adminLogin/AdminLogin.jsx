import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "./AdminLogin.css";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { cnic, password } = data;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/adminlogin', { cnic, password });

      localStorage.setItem('token', response.data.token);
      window.location.href = '/adminDashboard/AdminDashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className='admin-login-container'>
        <div className="admin-form">
          <h2 className='admin-heading'>Admin Login</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="admin-input">
              <label htmlFor="cnic">CNIC Number</label>
              <input
                type="text"
                placeholder="CNIC"
                {...register('cnic', {
                  required: "CNIC is required",
                  minLength: { value: 13, message: "CNIC must be 13 digits" },
                  maxLength: { value: 13, message: "CNIC must be 13 digits" },
                })}
              />
              {errors.cnic && <span className="error-text">{errors.cnic.message}</span>}
            </div>

            <div className="admin-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            <div className="admin-btn">
              <button type="submit"><span>Login</span></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
