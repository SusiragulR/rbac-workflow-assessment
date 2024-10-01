const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI as string);
        console.log('mongo connected....');
    } catch (error) {
        console.error(error);
    }
};

export default connectMongo;
