// This is an example of to protect an API route
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { connectMongoDB } from "@/libs/mongoose";
import { Todo } from "@/models/todo.model";
import mongoose from "mongoose";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    try {
      const { connect } = await connectMongoDB();
      const { content: _content } = req.body;
      if (_content.length > 2) {
        var _id = new mongoose.Types.ObjectId(session?.sub);
        const createTodo = await Todo.create({
          content: _content,
          userId: _id,
        });

        if (createTodo) {
          return res
            .status(200)
            .json({ error: false, message: "Create todo-list success." });
        } else {
          return res
            .status(200)
            .json({ error: true, message: "Invalid todo-list credentials." });
        }
      } else {
        return res.status(200).json({
          error: true,
          message: "Content todo-list too short.",
        });
      }
    } catch (e: any) {
      return res.status(200).json({
        error: "UNKNOWN_ERROR",
        server_message: e.message,
        message: "Please try again next time.",
      });
    }
  } else {
    res.status(200);
    res.send({
      message: "Bad request",
      error: "BAD_REQUEST",
    });
  }
}
