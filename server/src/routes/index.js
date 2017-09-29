import express from 'express';
const router = express.Router();
import register from './register';

router.use("/register", register);

export default router;
