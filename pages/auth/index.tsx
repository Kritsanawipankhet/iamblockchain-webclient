import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.module.css";
import Head from "next/head";
import Image from "next/image";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
type Props = {
  providers: [
    {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    }
  ];
  csrfToken: string;
};

export default function Signin({ providers, csrfToken }: Props) {
  const route = useRouter();
  const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    if (route.query.signUp === "true") {
      setSignUp(true);
    }
  }, [route.query.signUp]);

  return (
    <>
      <Head>
        <title>IAM To do - Authentication | IAMBLOCKCHAIN</title>
      </Head>
      <div className={Index.main}>
        <div
          className={`${Index.container} ${
            signUp ? Index.rightPanelActive : ""
          }`}
          id="container"
        >
          <div className={`${Index.formContainer} ${Index.signUpContainer}`}>
            <form action="#" className={Index.formGlobal}>
              <h1 className={Index.h1Global}>Create Account IAM To do</h1>
              <div className={Index.socialContainer}>
                <a
                  onClick={() => signIn("iamblockchain")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/iam.svg"
                    alt="IAM To do"
                    width={40}
                    height={40}
                  />
                </a>
                <a
                  onClick={() => signIn("google")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={40}
                    height={40}
                  />
                </a>
                <a
                  onClick={() => signIn("github")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/github.svg"
                    alt="Github"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
              <span className={Index.spanGlobal}>
                or use your email for registration
              </span>
              <input
                name="name"
                type="text"
                className={Index.inputGlobal}
                placeholder="Name"
                autoComplete="off"
              />
              <input
                name="email"
                type="email"
                className={Index.inputGlobal}
                placeholder="Email"
                autoComplete="off"
              />
              <input
                name="password"
                type="password"
                className={Index.inputGlobal}
                placeholder="Password"
              />
              <button className={`${Index.buttonGlobal} ${Index.mt2}`}>
                Sign Up
              </button>
            </form>
          </div>
          <div className={`${Index.formContainer} ${Index.signInContainer}`}>
            <form
              method="post"
              action="/api/auth/callback/credentials"
              className={Index.formGlobal}
            >
              <h1 className={Index.h1Global}>Sign in IAM To do</h1>
              <div className={Index.socialContainer}>
                <a
                  onClick={() => signIn("iamblockchain")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/iam.svg"
                    alt="IAM To do"
                    width={40}
                    height={40}
                  />
                </a>
                <a
                  onClick={() => signIn("google")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={40}
                    height={40}
                  />
                </a>
                <a
                  onClick={() => signIn("github")}
                  className={`${Index.aGlobal} ${Index.social}`}
                >
                  <Image
                    src="/github.svg"
                    alt="Github"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
              <span className={Index.spanGlobal}>or use your account</span>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input
                name="email"
                type="email"
                className={Index.inputGlobal}
                placeholder="Email"
                autoComplete="off"
              />
              <input
                name="password"
                type="password"
                className={Index.inputGlobal}
                placeholder="Password"
              />
              <a href="#" className={`${Index.aGlobal}`}>
                Forgot your password?
              </a>
              <button className={`${Index.buttonGlobal} ${Index.mt2}`}>
                Sign In
              </button>
            </form>
          </div>
          <div className={Index.overlayContainer}>
            <div className={Index.overlay}>
              <div className={`${Index.overlayPanel} ${Index.overlayLeft}`}>
                <div className={`${Index.logo}`}>
                  <Image
                    src="/iam.svg"
                    alt="IAM To do"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className={Index.h1Global}>Welcome Back!</h1>
                <p className={Index.pGlobal}>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={`${Index.buttonGlobal} ${Index.ghost} `}
                  id="signIn"
                  onClick={() => {
                    signOut({ redirect: false });
                    setSignUp(false);
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className={`${Index.overlayPanel} ${Index.overlayRight}`}>
                <div className={`${Index.logo}`}>
                  <Image
                    src="/iam.svg"
                    alt="IAM To do"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className={Index.h1Global}>Hello, Friend!</h1>
                <p className={Index.pGlobal}>
                  Enter your personal details and start with us &quot;IAM To
                  do&quot;
                </p>
                <button
                  className={`${Index.buttonGlobal} ${Index.ghost}`}
                  id="signUp"
                  onClick={() => {
                    signOut({ redirect: false });
                    setSignUp(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
};
