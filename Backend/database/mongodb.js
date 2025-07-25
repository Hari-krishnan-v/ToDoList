import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}
if (!process.env.DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to database in ${process.env.NODE_ENV} mode`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;