// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongoose";
import { type IUser, User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log(req.body);
  if (req.method === "POST") {
    try {
      const { connect } = await connectMongoDB();
      const { name: _name, email: _email, password: _password } = req.body;
      const emailCheck = await User.findOne({
        email: _email,
      });
      if (emailCheck) {
        return res.status(200).json({
          message:
            "Email is already used.<br><small>Please use a different email address that is not in use.</small>",
          error: "EMAIL_USED",
        });
      } else {
        let salt = bcrypt.genSaltSync(10);

        const createUser = await User.create({
          name: _name,
          email: _email.toLowerCase(),
          password: bcrypt.hashSync(_password, salt),
          emailVerified: null,
        })
          .then((d: any) => {
            return res.status(200).json({
              message: `Welcome , ${_name} <br>Thank you for joining us and taking part in our system testing.`,
              error: false,
            });
          })
          .catch((e: any) => {
            return res.status(200).json({
              error: "UNKNOWN_ERROR",
              server_message: e.message,
              message: "Please try again next time.",
            });
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
