import React from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

type Props = {};

export default function IAMBlockchainCallback({}: Props) {
  return <div>iamblockchain</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const { conn } = await connect();

  const { code, state } = context.query;
  const request = context.req;
  const authState = await context.req.cookies["next-auth.state"];
  //   const token = getToken({ request, secret });

  if (code && state) {
    // console.log(token);
    return { props: { authorization_code: code } };
  }
  return { props: { error: "" } };
};
