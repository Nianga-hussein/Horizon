import express, { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile
} from '../controllers/authController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Routes admin pour la gestion des utilisateurs
router.get('/', protect, authorize('admin'), (req: Request, res: Response) => {
  // Logique pour récupérer tous les utilisateurs (admin uniquement)
  res.send('Liste des utilisateurs - Admin uniquement');
});

export default router;