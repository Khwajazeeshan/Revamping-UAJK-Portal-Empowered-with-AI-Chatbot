import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const { cnic, password } = data;
    try {
      // Login API call
      const response = await axios.post('http://localhost:5000/api/auth/login', { cnic, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('studentCnic', cnic);

      // Check if registered in Admission
      try {
        const regResponse = await axios.get(`http://localhost:5000/api/applications/${cnic}`);
        if (regResponse.data) navigate('/StudentDashboard');
        else navigate('/register');
      } catch {
        navigate('/register');
      }
    } catch (err) {
      setError('apiError', { message: err.response?.data?.message || 'Something went wrong' });
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

            {/* API Error */}
            {errors.apiError && <p className="error-text">{errors.apiError.message}</p>}

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
