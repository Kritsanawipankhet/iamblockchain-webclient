import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { connect } from "../libs/mongoose";

type Props = {};

export default function Index({}: Props) {
  return (
    <div>
      <Head>
        <title>IAM To do - IAMBLOCKCHAIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <form method="post" action="https://iamblockchain.vercel.app/api/user">
          <button type="submit" value="submit">
            POST
          </button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { conn } = await connect();
  // console.log(conn);
  return { props: {} };
};
