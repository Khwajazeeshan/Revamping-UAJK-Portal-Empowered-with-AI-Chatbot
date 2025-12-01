import User from '../models/User.js';
import Admission from '../models/Admission.js';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/generatetoken.js';

// User Signup function
export const signupUser = async (req, res) => {
  const { cnic, name, fatherName, phone, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ cnic });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this CNIC already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      cnic,
      name,
      fatherName,
      phone,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id, newUser.isAdmin);

    // Set tokens as HTTP-only cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(201).json({
      message: 'User signed up successfully',
      user: {
        id: newUser._id,
        cnic: newUser.cnic,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login function
export const login = async (req, res) => {
  const { cnic, password } = req.body;

  const adminCnic = "8220312345678";
  const adminPassword = "admin12345";

  try {
    // Step 1: Check if CNIC matches admin
    if (cnic === adminCnic) {
      // Verify admin password
      if (password !== adminPassword) {
        return res.status(401).json({ message: "Incorrect Password" });
      }

      // Generate tokens for admin
      const { accessToken, refreshToken } = generateTokens("admin123", true);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        message: 'Admin login successful',
        isAdmin: true,
        user: { id: "admin123", cnic: adminCnic, name: "Admin", isAdmin: true }
      });
    }

    // Step 2: Check if CNIC exists in User database
    const user = await User.findOne({ cnic });
    if (!user) {
      return res.status(404).json({ message: 'User Not Exist!' });
    }

    // Step 3: Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }

    // Step 4: Check if user is registered for admission
    const admissionRecord = await Admission.findOne({ cnic });
    const isRegistered = !!admissionRecord;

    // Generate tokens for regular user
    const { accessToken, refreshToken } = generateTokens(user._id, user.isAdmin);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      isAdmin: user.isAdmin || false,
      isRegistered: isRegistered, // Include registration status
      user: {
        id: user._id,
        cnic: user.cnic,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false
      }
    });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// User forget password function
export const forgetpassword = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const user = await User.findOne({ cnic });
    if (!user) {
      return res.status(401).json({ success: false, message: "User Not Exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Register User function for admission (without password)
export const registerUser = async (req, res) => {
  const { name, fatherName, cnic, phone, email, matricMarks, fscMarks, degreeProgram, department1, department2, department3 } = req.body;

  try {
    // Check if CNIC already exists in Admission
    const existingAdmission = await Admission.findOne({ cnic });
    if (existingAdmission) {
      return res.status(400).json({ message: 'CNIC already registered for admission' });
    }

    // Create new admission entry
    const admission = new Admission({
      name,
      fatherName,
      cnic,
      phone,
      email,
      matricMarks,
      fscMarks,
      degreeProgram,
      department1,
      department2,
      department3,
      profilePhoto: req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null,
      matricDMCPhoto: req.files['matricDMCPhoto'] ? req.files['matricDMCPhoto'][0].path : null,
      fscDMCPhoto: req.files['fscDMCPhoto'] ? req.files['fscDMCPhoto'][0].path : null,
      transcriptPhoto: req.files['transcriptPhoto'] ? req.files['transcriptPhoto'][0].path : null,
    });

    await admission.save();
    res.status(201).json({ message: 'User registered successfully for admission' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
