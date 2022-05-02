import React, { useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

type Props = {
  authorization_code?: string;
  state?: string;
  client_id?: string;
  scope?: string;
};

export default function IAMBlockchainCallback({
  authorization_code,
  state,
  client_id,
  scope,
}: Props) {
  const formRef: any = useRef(null);
  useEffect(() => {
    formRef.current.submit();
  }, []);

  return (
    <div>
      <form
        ref={formRef}
        action={`${process.env.IAMBLOCKCHAIN_HOST}/oauth/token`}
        method="get"
      >
        <input type="hidden" name="client_id" value={client_id}></input>
        <input type="hidden" name="scope" value={scope}></input>
        <input type="hidden" name="response_type" value={"code"}></input>
        <input
          type="hidden"
          id="redirect_uri"
          name="redirect_uri"
          value={`${process.env.HOSTNAME}/api/auth/callback/iamblockchain`}
        ></input>
        <input
          type="hidden"
          id="code"
          name="code"
          value={authorization_code}
        ></input>
        <input type="hidden" id="stete" name="state" value={state}></input>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const { conn } = await connect();

  const { code, state, client_id, scope } = context.query;
  const request = context.req;
  //const authState = await context.req.cookies["next-auth.state"];
  //   const token = getToken({ request, secret });
  //console.log(context.query);

  if (code && state && client_id && scope) {
    // console.log(token);
    return {
      props: {
        authorization_code: code,
        state: state,
        client_id: client_id,
        scope: scope,
      },
    };
  }
  return {
    redirect: {
      destination: "/api/auth/callback/iamblockchain",
      permanent: false,
    },
  };
  //return { props: { error: "" } };
};
