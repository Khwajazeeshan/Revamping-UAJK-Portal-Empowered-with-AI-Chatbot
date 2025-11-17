import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "./SignupForm.css";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', data);
      alert(response.data.message);
      navigate('/admission');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-center">
          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="signup-heading">Signup</h3>
            <hr />

            {/* CNIC */}
            <div className="signup-input">
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

            {/* Name */}
            <div className="signup-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                })}
              />
              {errors.name && <span className="error-text">{errors.name.message}</span>}
            </div>

            {/* Father Name */}
            <div className="signup-input">
              <label htmlFor="fatherName">Father Name</label>
              <input
                type="text"
                placeholder="Father's Name"
                {...register('fatherName', {
                  required: 'Father Name is required',
                  minLength: { value: 3, message: 'Father Name must be at least 3 characters' },
                })}
              />
              {errors.fatherName && <span className="error-text">{errors.fatherName.message}</span>}
            </div>

            {/* Phone */}
            <div className="signup-input">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: { value: 11, message: 'Phone number must be 11 digits' },
                  maxLength: { value: 11, message: 'Phone number must be 11 digits' },
                })}
              />
              {errors.phone && <span className="error-text">{errors.phone.message}</span>}
            </div>

            {/* Email */}
            <div className="signup-input">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="signup-input">
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

            {/* Submit Button */}
            <div className="signup-btn">
              <button type="submit">
                <span>Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
