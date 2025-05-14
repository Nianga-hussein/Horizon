import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// GET all dossiers
router.get('/', protect, async (req, res) => {
  // This will be implemented with actual controller logic
  res.send('Get all dossiers');
});

// GET single dossier
router.get('/:id', protect, async (req, res) => {
  res.send(`Get dossier with id ${req.params.id}`);
});

// POST create dossier
router.post('/', protect, async (req, res) => {
  res.send('Create new dossier');
});

// PUT update dossier
router.put('/:id', protect, async (req, res) => {
  res.send(`Update dossier with id ${req.params.id}`);
});

// DELETE dossier
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  res.send(`Delete dossier with id ${req.params.id}`);
});

export default router;