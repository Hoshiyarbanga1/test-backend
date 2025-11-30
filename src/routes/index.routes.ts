import express from 'express';
import registerRoutes from './registerRoutes';

const router = express.Router();

router.use('/signup', registerRoutes);

export default router;
