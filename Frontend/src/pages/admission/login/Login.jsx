import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Login.css";

const server = import.meta.env.VITE_SERVER || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { cnic, password } = data;
    try {
      const loginResponse = await axios.post(
        `${server}/api/auth/login`,
        { cnic, password },
        { withCredentials: true }
      );

      if (loginResponse.data.isAdmin) {
        toast.success('Admin login successful!');
        setTimeout(() => {
          window.location.href = '/adminDashboard/AdminDashboard';
        }, 1000);
        return;
      }

      localStorage.setItem('studentCnic', cnic);

      if (loginResponse.data.isRegistered) {
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/StudentDashboard');
        }, 1000);
      } else {
        toast.success('Login successful! Please complete your registration.');
        setTimeout(() => {
          navigate('/register');
        }, 1000);
      }

    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data?.message;

        if (err.response.status === 404 && errorMessage === 'User Not Exist!') {
          toast.error('User Not Exist!');
          reset();
        } else if (err.response.status === 401 && errorMessage === 'Incorrect Password') {
          toast.error('Incorrect Password');
          reset();
        } else {
          toast.error(errorMessage || 'Something went wrong');
          reset();
        }
      } else {
        toast.error('Network error. Please try again.');
        reset();
      }
    }
  };


  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-heading">Login</h2>
          <hr />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* CNIC Field */}
            <div className="login-input">
              <label htmlFor="cnic">CNIC Number</label>
              <input
                type="text"
                placeholder="CNIC"
                {...register('cnic', {
                  required: 'CNIC is required',
                  minLength: { value: 13, message: 'CNIC must be 13 digits' },
                  maxLength: { value: 13, message: 'CNIC must be 13 digits' },
                })}
              />
              {errors.cnic && <span className="error-text">{errors.cnic.message}</span>}
            </div>

            {/* Password Field */}
            <div className="login-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
              />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>


            {/* Buttons */}
            <div className="login-btn">
              <button type="submit">
                <span>Login</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/forget')}
                className="forget-btn"
              >
                Forget Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
