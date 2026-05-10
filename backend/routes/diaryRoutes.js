const express = require('express');
const {
    createDiary,
    getDiaries,
    getDiaryById,
    updateDiary,
    deleteDiary
} = require('../controllers/diaryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createDiary);
router.get('/', protect, getDiaries);
router.get('/:id', protect, getDiaryById);
router.put('/:id', protect, updateDiary);
router.delete('/:id', protect, deleteDiary);

module.exports = router;