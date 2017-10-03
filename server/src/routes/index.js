import express from 'express';
const router = express.Router();

import register from './register';
import login from './login';

router.use("/register", register);
router.use("/login", login);

export default router;
