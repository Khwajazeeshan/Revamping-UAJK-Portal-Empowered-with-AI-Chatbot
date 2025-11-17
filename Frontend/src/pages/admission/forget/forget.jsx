import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./forget.css";

const Forget = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { cnic, password } = data;
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forget', {
                cnic,
                password,
            });
            localStorage.setItem('token', response.data.token);
            if (response.data.success) {
                navigate('/login');
            } else {
                alert(response.data.message || "Something went wrong");
            }
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred. Try again.");
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-heading">Forget Password</h2>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-input">
                            <label htmlFor="cnic">CNIC Number</label>
                            <input
                                type="text"
                                placeholder="Enter CNIC"
                                {...register("cnic", {
                                    required: "CNIC is required",
                                    minLength: { value: 13, message: "CNIC must be 13 digits" },
                                    maxLength: { value: 13, message: "CNIC must be 13 digits" },
                                })}
                            />
                            {errors.cnic && (
                                <span className="error-text">{errors.cnic.message}</span>
                            )}
                        </div>

                        <div className="login-input">
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                })}
                            />
                            {errors.password && (
                                <span className="error-text">{errors.password.message}</span>
                            )}
                        </div>

                        <div className="login-btn">
                            <button type="submit">
                                <span>Update Password</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Forget;
