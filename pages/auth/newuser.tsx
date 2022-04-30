import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.signup.module.css";
import Head from "next/head";
import Image from "next/image";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { Formik } from "formik";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Swal from "sweetalert2";
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
  user: {
    email?: string;
    name?: string;
    provider: string;
  };
};

export default function Signin({ providers, csrfToken, user }: Props) {
  const router = useRouter();

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
                email: user.email ? user.email : "",
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
                setTimeout(async () => {
                  const handleUpdate = async (_values: any) => {
                    // Make the API request
                    const updateUser = await fetch("/api/user/update", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(_values),
                    });
                    const data = await updateUser.json();
                    return data;
                  };
                  const result = await handleUpdate(values);
                  if (result.error) {
                    Swal.fire({
                      html: `${result.message}`,
                      icon: "error",
                      confirmButtonColor: "#007bff",
                    });
                  } else if (result.error == false) {
                    Swal.fire({
                      html: `${result.message}`,
                      icon: "success",
                      confirmButtonColor: "#007bff",
                    }).then(() => {
                      router.push("/");
                    });
                  }

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
                  <h1 className={Index.h1Global}>Update Account IAM To do</h1>
                  <span className={Index.spanGlobal}>
                    <b>You are connected to the service provider</b>
                  </span>
                  <div className={Index.socialContainer}>
                    {user.provider === "google" ? (
                      <a className={`${Index.aGlobal} ${Index.social}`}>
                        <Image
                          src="/google.svg"
                          alt="Google"
                          width={50}
                          height={50}
                        />
                      </a>
                    ) : user.provider === "github" ? (
                      <a className={`${Index.aGlobal} ${Index.social}`}>
                        <Image
                          src="/github.svg"
                          alt="Github"
                          width={50}
                          height={50}
                        />
                      </a>
                    ) : (
                      <a className={`${Index.aGlobal} ${Index.social}`}>
                        <Image
                          src="/iam.svg"
                          alt="IAMBLOCKCHAIN"
                          width={50}
                          height={50}
                        />
                      </a>
                    )}
                  </div>
                  <span className={`${Index.spanGlobal} `}>
                    Please update your personal info
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
                      readOnly={user.email ? true : false}
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
                    type="submit"
                    className={`${Index.buttonGlobal} ${Index.mt2}`}
                    disabled={isSubmitting}
                  >
                    Let&lsquo;s Start !
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
                <h1 className={Index.h1Global}>Welcome !</h1>
                <p className={Index.pGlobal}>
                  Thank you for joining us and taking part in our system
                  testing.
                </p>
                <Link href="/auth/signin" passHref>
                  <button
                    className={`${Index.buttonGlobal} ${Index.ghost} `}
                    id="signIn"
                    onClick={() => {
                      signOut({ redirect: false });
                    }}
                  >
                    Sign Out
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    // @ts-ignore
    const provider = session.user.provider;
    if (session.user?.email) {
      if (
        provider === "google" ||
        provider === "github" ||
        provider === "iamblockchain"
      ) {
        return {
          props: {
            providers: await getProviders(),
            csrfToken: await getCsrfToken(context),
            user: { email: session.user?.email, provider: provider },
          },
        };
      } else {
        await signOut();
        return { redirect: { destination: "/auth/signin", permanent: false } };
      }
    } else {
      return {
        props: {
          providers: await getProviders(),
          csrfToken: await getCsrfToken(context),
          user: { provider: provider },
        },
      };
    }
  } else {
    return {
      props: {
        providers: await getProviders(),
        csrfToken: await getCsrfToken(context),
      },
    };
  }
};
