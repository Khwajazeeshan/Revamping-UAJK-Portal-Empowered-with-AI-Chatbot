import express from 'express';
import { getAllAdmissions, getAdmissionById } from '../controllers/applicationController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin route to get all admissions
router.get('/', isAdmin, getAllAdmissions);


// Route to get a specific admission by CNIC
router.get('/:cnic', getAdmissionById);

export default router;
