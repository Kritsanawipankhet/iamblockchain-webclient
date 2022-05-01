import mongoose from "mongoose";
import { userSchema } from "./user.model";

interface ITodo {
  content: string;
  active: boolean;
  userId: string;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    content: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export { Todo };
