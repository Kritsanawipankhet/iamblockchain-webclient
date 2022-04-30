import mongoose, { ConnectOptions } from "mongoose";

// connection function
export const connectMongoDB = async () => {
  const connect = await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .catch((err) => {
      console.log(err);
    });

  return { connect };
};
