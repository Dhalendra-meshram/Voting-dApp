import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI as string);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB connection failed ");
    process.exit(1);
  }
};