import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.signup.module.css";
import Head from "next/head";
import Image from "next/image";
import { getToken } from "next-auth/jwt";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { regExpEmail } from "@/libs/regex";
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
  user?: {
    email?: string;
    name?: string;
  };
};

export default function Signin({ providers, csrfToken, user }: Props) {
  const route = useRouter();

  return (
    <>
      <Head>
        <title>IAM To do - Authentication | IAMBLOCKCHAIN</title>
      </Head>
      <div className={Index.main}>
        <div
          className={`${Index.container} ${Index.rightPanelActive}`}
          id="container"
        >
          <div className={`${Index.formContainer} ${Index.signUpContainer}`}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors: any = {};
                if (values.name.length <= 3) {
                  errors.name = "Name must be at least 3 characters.";
                }
                if (regExpEmail(values.email)) {
                  errors.email = "This email address is not valid.";
                }
                if (values.password.length <= 6) {
                  errors.password = "Password must be at least 6 characters.";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleCreate(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={Index.formGlobal}>
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
                  <FormControl
                    mt="2"
                    mb="1"
                    isRequired
                    isInvalid={
                      errors.name && touched.name && errors.name ? true : false
                    }
                  >
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className={Index.inputGlobalNewUser}
                      placeholder="Name"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      required={true}
                      autoFocus={false}
                    />
                    {errors.name && touched.name && errors.name ? (
                      <FormErrorMessage fontSize="xs">
                        {errors.name}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl
                    mt="2"
                    mb="1"
                    isRequired
                    isInvalid={
                      errors.email && touched.email && errors.email
                        ? true
                        : false
                    }
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className={Index.inputGlobalNewUser}
                      placeholder="sample@email.com"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      required={true}
                    />
                    {errors.email && touched.email && errors.email ? (
                      <FormErrorMessage fontSize="xs">
                        {errors.email}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl
                    mt="2"
                    mb="1"
                    isRequired
                    isInvalid={
                      errors.password && touched.password && errors.password
                        ? true
                        : false
                    }
                  >
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className={Index.inputGlobalNewUser}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      required={true}
                    />
                    {errors.password && touched.password && errors.password ? (
                      <FormErrorMessage fontSize="xs">
                        {errors.password}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`${Index.buttonGlobal} ${Index.mt2}`}
                  >
                    Sign Up
                  </button>
                </form>
              )}
            </Formik>
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
                <Link href="/auth/signin" passHref>
                  <button
                    className={`${Index.buttonGlobal} ${Index.ghost} `}
                    id="signIn"
                    onClick={() => {
                      signOut({ redirect: false });
                    }}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const handleCreate = async (_values: any) => {
  // Make the API request
  const createUser = await fetch("/api/user/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_values),
  });
  const data = await createUser.json();
  console.log(data);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });

  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  } else {
    return {
      props: {
        providers: await getProviders(),
        csrfToken: await getCsrfToken(context),
      },
    };
  }
};
