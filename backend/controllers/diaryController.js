const Diary = require('../models/Diary');

const createDiary = async (req, res) => {
    try {
        const diary = await Diary.create({
            user: req.user._id,
            title: req.body.title,
            content: req.body.content,
            mood: req.body.mood
        });

        res.status(201).json(diary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDiaries = async (req, res) => {
    try {
        const diaries = await Diary.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.json(diaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDiaryById = async (req, res) => {
    try {
        const diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).json({ message: 'Diary not found' });
        }

        if (diary.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(diary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDiary = async (req, res) => {
    try {
        const diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).json({ message: 'Diary not found' });
        }

        if (diary.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        diary.title = req.body.title;
        diary.content = req.body.content;
        diary.mood = req.body.mood;

        const updatedDiary = await diary.save();

        res.json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDiary = async (req, res) => {
    try {
        const diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).json({ message: 'Diary not found' });
        }

        if (diary.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await diary.deleteOne();

        res.json({ message: 'Diary deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDiary,
    getDiaries,
    getDiaryById,
    updateDiary,
    deleteDiary
};