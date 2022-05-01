import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.signup.module.css";
import Head from "next/head";
import Image from "next/image";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { Formik } from "formik";
import { FormControl, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Swal from "sweetalert2";
import { regExpEmail, regExpName } from "@/libs/regex";
import FadeIn from "react-fade-in";
import Lottie from "lottie-react";
import * as loadingData from "@/components/loading/loading.json";
import { getToken } from "next-auth/jwt";

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
    provider?: string;
  };
};

export default function Signin({ providers, csrfToken, user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  return (
    <>
      <Head>
        <title>IAM To do - Authentication | IAMBLOCKCHAIN</title>
      </Head>
      <div className={Index.main}>
        {loading ? (
          <FadeIn>
            <div style={{ display: "flex" }}>
              <Lottie animationData={loadingData} loop autoplay />
            </div>
          </FadeIn>
        ) : (
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
                  if (regExpName(values.name)) {
                    errors.name =
                      "Are you sure you entered your name correctly ? ";
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
                  setBtnDisabled(true);
                  setTimeout(async () => {
                    const handleUpdate = async (_values: any) => {
                      // Make the API request
                      const updateUser = await fetch("/api/user/update", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(_values),
                      })
                        .then((response) => response.json())
                        .then((json) => {
                          if (json.error) {
                            Swal.fire({
                              html: `${json.message}`,
                              icon: "error",
                              confirmButtonColor: "#007bff",
                            }).then(() => {
                              setBtnDisabled(false);
                              setSubmitting(false);
                            });
                          } else if (json.error == false) {
                            Swal.fire({
                              html: `${json.message}`,
                              icon: "success",
                              confirmButtonColor: "#007bff",
                            }).then(() => {
                              setBtnDisabled(false);
                              setLoading(true);
                              setTimeout(async () => {
                                router.push("/");
                              }, 1000);
                            });
                          }
                        });
                    };
                    handleUpdate(values);
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
                        errors.name && touched.name && errors.name
                          ? true
                          : false
                      }
                    >
                      <Input
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        readOnly={values.email ? true : false}
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
                        disabled={isSubmitting}
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
                      {errors.password &&
                      touched.password &&
                      errors.password ? (
                        <FormErrorMessage fontSize="xs">
                          {errors.password}
                        </FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
                    <Button
                      px="24px"
                      mt="3"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                      loadingText="STARTING"
                      color="white"
                      bg="#007bff"
                      borderRadius="50"
                      _hover={{ bg: "#007bff" }}
                      _active={{
                        color: "white",
                        bg: "#007bff",
                        transform: "scale(0.98)",
                        borderColor: "#007bff",
                      }}
                    >
                      LET&lsquo;S START !
                    </Button>
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
                      disabled={btnDisabled}
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
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });

  if (session) {
    // @ts-ignore
    console.log(session);
    const provider = session.provider;
    if (session.sub) {
      if (provider === "google" || provider === "github") {
        return {
          props: {
            providers: await getProviders(),
            csrfToken: await getCsrfToken(context),
            user: { email: session.email, provider: provider },
          },
        };
      } else if (provider === "iamblockchain") {
        return {
          props: {
            providers: await getProviders(),
            csrfToken: await getCsrfToken(context),
            user: { provider: provider },
          },
        };
      } else {
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
