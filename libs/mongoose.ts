import mongoose, { Model } from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  //   // OUR TODO SCHEMA
  //   const TodoSchema = new mongoose.Schema({
  //     item: String,
  //     completed: Boolean,
  //   });

  //   // OUR TODO MODEL
  //   const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

  return { conn };
};
