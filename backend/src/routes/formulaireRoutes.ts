import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// GET WISI form
router.get('/wisi', protect, async (req, res) => {
  res.send('Get WISI form template');
});

// GET TARII form
router.get('/tarii', protect, async (req, res) => {
  res.send('Get TARII form template');
});

// GET FHN form
router.get('/fhn', protect, async (req, res) => {
  res.send('Get FHN form template');
});

// POST submit form
router.post('/:type', protect, async (req, res) => {
  const { type } = req.params;
  res.send(`Submit ${type} form`);
});

export default router;