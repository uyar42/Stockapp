import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to Mongodb ${error.message}`);
    process.exit(1);
  }
};
