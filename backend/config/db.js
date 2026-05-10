const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('❓  Missing MongoDB URI. Add MONGODB_URI to backend/.env.');
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('✅  MongoDB Connected');
    } catch (error) {
        console.error('❌  MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;