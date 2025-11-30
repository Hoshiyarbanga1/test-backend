// Example User Routes
import { Router } from 'express';
import { signup } from '../controllers/register/signup.controller';
// import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/signup', signup);

export default router;

// {
//   "first_name": "John",
//   "last_name": "Doe",
//   "dob": "1995-12-12",
//   "email": "john@example.com",
//   "mobile": "9876543210",
//   "gender": "male",
//   "password": "secret123"
// }