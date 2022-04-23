import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
// import { connect } from "../libs/mongoose";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { useRouter, type NextRouter } from "next/router";

type Props = {};
declare let document: any;
let router: NextRouter;
export default function Index({}: Props) {
  router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      } else {
        if (!session) {
          router.replace("/api/auth/signin");
        }
      }
    };

    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return <div></div>;

  return (
    <>
      <div></div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const { conn } = await connect();
  // console.log(conn);
  return { props: {} };
};
