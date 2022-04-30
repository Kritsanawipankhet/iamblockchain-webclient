// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongoose";
import { User } from "@/models/user.model";
import { Account } from "@/models/account.model";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method === "POST") {
    const session = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { connect } = await connectMongoDB();
    try {
      const { name: _name, email: _email, password: _password } = req.body;

      if (session) {
        const user = await User.findOne({
          _id: session.sub,
        });
        const account = await Account.findOne({
          userId: user._id,
        });
        const emailCheck = await User.findOne({
          email: _email,
        });
        let salt = bcrypt.genSaltSync(10);
        if (session.provider === "iamblockchain") {
          if (emailCheck) {
            return res.status(200).json({
              message: "This email is already used.",
              error: "EMAIL_USED",
            });
          } else {
            const updateUser = await User.findByIdAndUpdate(user._id, {
              name: _name,
              email: _email,
              password: bcrypt.hashSync(_password, salt),
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
        } else {
          if (user) {
            const updateUser = await User.findByIdAndUpdate(user._id, {
              name: _name,
              password: bcrypt.hashSync(_password, salt),
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
        }
      } else {
        return res.status(200).json({
          message: "Session expired please sign in again.",
          error: "SESSION_ERROR",
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
