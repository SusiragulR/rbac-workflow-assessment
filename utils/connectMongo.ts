import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectMongoDb = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('MONGO_URI is not defined in environment variables');
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('mongo connected...');
    } catch (error) {
        console.log((error as Error).message);
    }
};

export default connectMongoDb;
