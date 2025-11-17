import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert("Registration successful!");
      navigate('/StudentDashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className='register-main-container'>
        <div className="register-form">
          <h2 className='register-heading'>Register</h2>
          <hr />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Info */}
            <div className="register-personal-info">
              <h2>Personal Information</h2>

              <div className="register-input">
                <label>Applicant Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />
                {errors.name && <span className="error-text">{errors.name.message}</span>}
              </div>

              <div className="register-input">
                <label>Applicant Father Name</label>
                <input
                  type="text"
                  placeholder="Father Name"
                  {...register("fatherName", {
                    required: "Father Name is required",
                    minLength: { value: 3, message: "Father Name must be at least 3 characters" },
                  })}
                />
                {errors.fatherName && <span className="error-text">{errors.fatherName.message}</span>}
              </div>

              <div className="register-input">
                <label>CNIC Number</label>
                <input
                  type="text"
                  placeholder="CNIC"
                  {...register("cnic", {
                    required: "CNIC is required",
                    minLength: { value: 13, message: "CNIC must be 13 digits" },
                    maxLength: { value: 13, message: "CNIC must be 13 digits" },
                  })}
                />
                {errors.cnic && <span className="error-text">{errors.cnic.message}</span>}
              </div>

              <div className="register-input">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                  })}
                />
                {errors.phone && <span className="error-text">{errors.phone.message}</span>}
              </div>

              <div className="register-input">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </div>
            </div>

            {/* Academic Info */}
            <div className="register-academic">
              <h2>Academic Details</h2>

              <div className="register-input">
                <label>Matric Marks Out of 1100</label>
                <input
                  type="text"
                  placeholder="Matric Marks"
                  {...register("matricMarks", {
                    required: "Matric Marks are required",
                    minLength: { value: 2, message: "Enter valid marks" },
                  })}
                />
                {errors.matricMarks && <span className="error-text">{errors.matricMarks.message}</span>}
              </div>

              <div className="register-input">
                <label>FSc Marks Out of 1100</label>
                <input
                  type="text"
                  placeholder="FSc Marks"
                  {...register("fscMarks", {
                    required: "FSc Marks are required",
                    minLength: { value: 2, message: "Enter valid marks" },
                  })}
                />
                {errors.fscMarks && <span className="error-text">{errors.fscMarks.message}</span>}
              </div>

              <div className="register-input">
                <label>Degree Program:</label>
                <select {...register("degreeProgram", { required: "Degree Program is required" })}>
                  <option value="BS">BS</option>
                  <option value="MS">MS</option>
                  <option value="M.Phil">M.Phil</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.degreeProgram && <span className="error-text">{errors.degreeProgram.message}</span>}
              </div>

              <div className="register-input">
                <label>Departments (Priority based):</label>
                <input
                  className="register-dpts"
                  type="text"
                  placeholder="Department 1"
                  {...register("department1", {
                    required: "At least one department is required",
                    minLength: { value: 2, message: "Department must be at least 2 characters" },
                  })}
                />
                <input
                  className="register-dpts"
                  type="text"
                  placeholder="Department 2"
                  {...register("department2")}
                />
                <input
                  className="register-dpts"
                  type="text"
                  placeholder="Department 3"
                  {...register("department3")}
                />
                {errors.department1 && <span className="error-text">{errors.department1.message}</span>}
              </div>
            </div>

            {/* Media Uploads */}
            <div className="register-media">
              <h2>Media Upload</h2>

              <div className="register-input">
                <label>Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profilePhoto", { required: "Profile photo is required" })}
                />
                {errors.profilePhoto && <span className="error-text">{errors.profilePhoto.message}</span>}
              </div>

              <div className="register-input">
                <label>Matric DMC</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("matricDMCPhoto", { required: "Matric DMC is required" })}
                />
                {errors.matricDMCPhoto && <span className="error-text">{errors.matricDMCPhoto.message}</span>}
              </div>

              <div className="register-input">
                <label>FSc DMC</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("fscDMCPhoto", { required: "FSc DMC is required" })}
                />
                {errors.fscDMCPhoto && <span className="error-text">{errors.fscDMCPhoto.message}</span>}
              </div>

              <div className="register-input">
                <label>BS Degree/Transcript (Optional)</label>
                <input type="file" accept="image/*" {...register("transcriptPhoto")} />
              </div>
            </div>

            <div className="register-btn">
              <button type="submit"><span>Register</span></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
