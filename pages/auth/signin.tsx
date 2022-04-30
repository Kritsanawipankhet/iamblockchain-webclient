import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.signin.module.css";
import Head from "next/head";
import Image from "next/image";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Swal from "sweetalert2";
import { getToken } from "next-auth/jwt";
import { FormControl, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import FadeIn from "react-fade-in";
import Lottie from "lottie-react";
import * as loadingData from "@/components/loading/loading.json";
import { Formik } from "formik";
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
};

export default function Signin({ providers, csrfToken }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (router.query.error === "OAuthAccountNotLinked") {
    Swal.fire({
      title: "Account Not Linked",
      html: "Can't connect to the provider you need. <br><small>Because the email is already used or tied to another service provider. If you want to connect to this email You must log in and connect again.</small>",
      icon: "error",
      confirmButtonColor: "#007bff",
    });
  }

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
          <div className={`${Index.container}`} id="container">
            <div className={`${Index.formContainer} ${Index.signInContainer}`}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors: any = {};
                  if (regExpEmail(values.email)) {
                    errors.email = "This email address is not valid.";
                  }
                  if (values.password.length <= 6) {
                    errors.password = "Password must be at least 6 characters.";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  setTimeout(async () => {
                    const res = await signIn("credentials", {
                      redirect: false,
                      email: values.email,
                      password: values.password,
                    }).then((data: any) => {
                      if (data.error === "No user found with the email") {
                        Swal.fire({
                          html: "No user found with the email.<br><small>If you want to connect to this email You must sign up.</small>",
                          icon: "error",
                          confirmButtonColor: "#007bff",
                        });
                      } else if (
                        data.error === "Password doesnt match with the user"
                      ) {
                        Swal.fire({
                          html: "Password doesn't match with the user<br><small>If you want to connect to this email You must reset your password..</small>",
                          icon: "error",
                          confirmButtonColor: "#007bff",
                        });
                      } else {
                        setLoading(true);
                        setTimeout(async () => {
                          router.push("/");
                        }, 1000);
                      }
                      setSubmitting(false);
                    });
                  }, 1000);
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
                    <span className={Index.spanGlobal}>
                      or use your account
                    </span>
                    <input
                      name="csrfToken"
                      type="hidden"
                      defaultValue={csrfToken}
                    />
                    <FormControl
                      mt="3"
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
                    <a href="#" className={`${Index.aGlobal}`}>
                      Forgot your password?
                    </a>
                    <Button
                      isLoading={isSubmitting}
                      px="24px"
                      disabled={isSubmitting}
                      type="submit"
                      loadingText="Signed In"
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
                      SIGN IN
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
            <div className={Index.overlayContainer}>
              <div className={Index.overlay}>
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
                  <Link href="/auth/signup" passHref>
                    <button
                      className={`${Index.buttonGlobal} ${Index.ghost}`}
                      id="signUp"
                      onClick={() => {
                        signOut({ redirect: false });
                      }}
                    >
                      Sign Up
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
