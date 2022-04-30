// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/mongoose";
import { type IUser, User } from "@/models/user.model";
import { Account } from "@/models/account.model";
import { getToken } from "next-auth/jwt";
import Joi from "joi";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  if (req.method === "POST") {
    const userSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }),
      name: Joi.string(),
      password: Joi.string().required().min(4),
    });

    const { connect } = await connectMongoDB();

    try {
      const validateUserInfo = userSchema.validate(req.body);
      console.log(validateUserInfo);
      if (validateUserInfo.error) {
        return res.status(200).json({
          error: "INVALID_CREDENTIALS",
          message: validateUserInfo.error.message,
        });
      }
      //   const emailCheck = await User.findOne({
      //     email: _email,
      //   });
      //   if (emailCheck) {
      //     return res.status(200).json({
      //       message: "Email is already used.",
      //       error: "EMAIL_USED",
      //     });
      //   } else {
      //     const createUser = await User.create({
      //       name: _name,
      //       email: _email,
      //       password: _password,
      //     })
      //       .then((d: any) => {
      //         return res.status(200).json({
      //           message: `Welcome , ${_name} <br>Thank you for joining us and taking part in our system testing.`,
      //           error: false,
      //         });
      //       })
      //       .catch((e: any) => {
      //         return res.status(200).json({
      //           error: "UNKNOWN_ERROR",
      //           server_message: e.message,
      //           message: "Please try again next time.",
      //         });
      //       });
      //   }
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
