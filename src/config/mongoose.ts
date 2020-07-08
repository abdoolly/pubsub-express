import mongoose from 'mongoose';

export const connectDB = () => {
    let { DB_HOST,
        DB_NAME,
        DB_USERNAME,
        DB_PASSWORD } = process.env;
    return mongoose.connect(
        `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};