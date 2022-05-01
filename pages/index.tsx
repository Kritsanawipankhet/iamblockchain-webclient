import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
// import { connect } from "../libs/mongoose";
import type { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { useRouter, type NextRouter } from "next/router";
import { signOut } from "next-auth/react";
import Index from "@/styles/todo.module.css";
import Image from "next/image";
import UpdateModal from "@/components/todo/updateModal";
import DeleteModal from "@/components/todo/deleteModal";
import {
  useDisclosure,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box,
  Button,
  Flex,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Divider,
  List,
  ListItem,
  Checkbox,
  IconButton,
  HStack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon, EditIcon } from "@chakra-ui/icons";
import { User } from "@/models/user.model";
import { connectMongoDB } from "@/libs/mongoose";
import FadeIn from "react-fade-in";
import Lottie from "lottie-react";
import * as loadingData from "@/components/loading/loading.json";
import { Formik } from "formik";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

type Props = {
  user: {
    email: string;
    name: string;
    provider: string;
  };
};
declare let document: any;
let router: NextRouter;

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#a8adb5",
    borderRadius: "50px",
  },
};

export default function Home({ user }: Props) {
  router = useRouter();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<any>([]);
  const [todoCurrentId, setTodoCurrentId] = useState("");
  const [todoCurrentContent, setTodoCurrentContent] = useState("");
  const [addLodding, setAddLoading] = useState(false);
  const [checkboxDisable, setCheckboxDisable] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();
  const finalRef: any = React.useRef();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todo/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setTodos(result);
    };
    fetchData();
  }, [todos]);

  const handleActive = async (_id: string, _check: boolean) => {
    const activeTodo = await fetch("/api/todo/check/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId: _id, active: _check }),
    })
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setCheckboxDisable(false);
          console.log(json);
        }, 400);
      });
  };
  return (
    <>
      <Head>
        <title>IAM To do - IAMBLOCKCHAIN</title>
      </Head>
      <div className={Index.main}>
        {loading ? (
          <FadeIn>
            <div style={{ display: "flex" }}>
              <Lottie animationData={loadingData} loop autoplay />
            </div>
          </FadeIn>
        ) : (
          <div className={`${Index.container} `} id="container">
            <div className={Index.leftContainer}>
              <div className={Index.menuContent}>
                <div className={Index.menuProfile}>
                  <div className={Index.profileContent}>
                    <div className={`${Index.mb2}`}>
                      <Image
                        src="/iam.svg"
                        alt="IAM To do"
                        width={100}
                        height={100}
                        className={`${Index.logo}`}
                      />
                    </div>

                    <p className={Index.profileName}>Hello, {user.name} !</p>
                    <p className={Index.profileEmail}>{user.email}</p>
                  </div>

                  <div className={Index.settingContent}>
                    <button
                      className={`${Index.buttonGlobal} ${Index.ghost} `}
                      id="signOut"
                      onClick={() => {
                        signOut({
                          redirect: true,
                          callbackUrl: `${process.env.HOSTNAME}/auth/signin`,
                        });
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={Index.rightContainer}>
              <div>
                <div>
                  <Formik
                    initialValues={{
                      todoContent: "",
                    }}
                    validate={(values) => {
                      const errors: any = {};
                      if (
                        values.todoContent.length > 0 &&
                        values.todoContent.length < 2
                      ) {
                        errors.todoContent = "Content todo-list too short.";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setAddLoading(true);
                      setTimeout(() => {
                        const handleCreate = async (_values: any) => {
                          const createCreate = await fetch("/api/todo/add/", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              content: values.todoContent,
                            }),
                          })
                            .then((response) => response.json())
                            .then((json) => {
                              setTimeout(() => {
                                values.todoContent = "";
                                setAddLoading(false);
                                //console.log(json);
                              }, 500);
                            });
                        };
                        handleCreate(values);
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
                      <form onSubmit={handleSubmit}>
                        <ChakraProvider theme={theme}>
                          <Box pt={30} pl={30} pb={4} pr={30}>
                            <Flex gap={3}>
                              <Box flex="1">
                                <FormControl
                                  variant="floating"
                                  id="content"
                                  isRequired
                                  isInvalid={errors.todoContent ? true : false}
                                >
                                  <Input
                                    id="todoContent"
                                    name="todoContent"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.todoContent}
                                    placeholder=" "
                                    autoComplete="off"
                                    required={true}
                                    disabled={addLodding}
                                  />
                                  {/* It is important that the Label comes after the Control due to css selectors */}
                                  <FormLabel>
                                    What do you need to do ?
                                  </FormLabel>

                                  {errors.todoContent &&
                                  touched.todoContent &&
                                  errors.todoContent ? (
                                    <FormErrorMessage>
                                      {errors.todoContent}
                                    </FormErrorMessage>
                                  ) : (
                                    <FormHelperText>
                                      Keep it very short and sweet!
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Box>
                              <Box w="22%">
                                <Button
                                  isLoading={addLodding}
                                  disabled={addLodding}
                                  loadingText="ADDING"
                                  type="submit"
                                  w="100%"
                                  leftIcon={<AddIcon />}
                                  color="white"
                                  bg="#007bff"
                                  _hover={{ bg: "#1E90FF" }}
                                  _active={{
                                    color: "white",
                                    bg: "#3182ce",
                                    transform: "scale(0.98)",
                                    borderColor: "#007bff",
                                  }}
                                >
                                  Add
                                </Button>
                              </Box>
                            </Flex>
                          </Box>
                        </ChakraProvider>
                      </form>
                    )}
                  </Formik>
                  <Box pt={0} pl={30} pb={4} pr={30}>
                    <Tabs variant="enclosed">
                      <TabList>
                        <Tab fontSize="14px" fontWeight={500}>
                          ALL
                        </Tab>
                        <Tab fontSize="14px" fontWeight={500}>
                          ACTIVE
                        </Tab>
                        <Tab fontSize="14px" fontWeight={500}>
                          COMPLETED
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel
                          overflowY="scroll"
                          h="360px"
                          css={scrollbarStyle}
                        >
                          <List spacing={3} fontSize="14px" fontWeight={300}>
                            {todos.length > 0 ? (
                              todos.map((e: any, index: number) => (
                                <Box key={e._id}>
                                  <ListItem mb="3">
                                    <Flex gap={3} align="center">
                                      <Checkbox
                                        id={e._id}
                                        defaultChecked={e.active}
                                        isChecked={e.active}
                                        disabled={checkboxDisable}
                                        onChange={(event) => {
                                          setCheckboxDisable(true);
                                          handleActive(
                                            e._id,
                                            event.target.checked
                                          );
                                        }}
                                      />
                                      <Text
                                        fontSize="16px"
                                        as={e.active ? "del" : "data"}
                                      >
                                        {e.content}
                                      </Text>
                                      <Spacer />
                                      <HStack>
                                        <Tooltip
                                          label="Edit"
                                          placement="top-start"
                                        >
                                          <IconButton
                                            variant="outline"
                                            aria-label="Edit"
                                            size="xs"
                                            icon={<EditIcon />}
                                            onClick={() => {
                                              setTodoCurrentId(e._id);
                                              setTodoCurrentContent(e.content);
                                              onEditOpen();
                                            }}
                                          />
                                        </Tooltip>
                                        <Tooltip
                                          label="Delete"
                                          placement="top-start"
                                        >
                                          <IconButton
                                            variant="outline"
                                            aria-label="Delete"
                                            size="xs"
                                            icon={<SmallCloseIcon />}
                                            onClick={() => {
                                              setTodoCurrentId(e._id);
                                              onDelOpen();
                                            }}
                                          />
                                        </Tooltip>
                                      </HStack>
                                    </Flex>
                                  </ListItem>
                                  <Divider />
                                </Box>
                              ))
                            ) : (
                              <ListItem>
                                <Flex gap={3} align="center" justify="center">
                                  <Text>There is no to-do list.</Text>
                                </Flex>
                              </ListItem>
                            )}
                          </List>
                        </TabPanel>
                        <TabPanel
                          overflowY="scroll"
                          h="360px"
                          css={scrollbarStyle}
                        >
                          <List spacing={3} fontSize="14px" fontWeight={300}>
                            {todos.filter((l: any) => l.active == false)
                              .length > 0 ? (
                              todos
                                .filter((f: any) => f.active == false)
                                .map((e: any, index: number) => (
                                  <Box key={e._id}>
                                    <ListItem mb="3">
                                      <Flex gap={3} align="center">
                                        <Checkbox
                                          id={e._id}
                                          defaultChecked={e.active}
                                          isChecked={e.active}
                                          disabled={checkboxDisable}
                                          onChange={(event) => {
                                            setCheckboxDisable(true);
                                            handleActive(
                                              e._id,
                                              event.target.checked
                                            );
                                          }}
                                        />
                                        <Text
                                          fontSize="16px"
                                          as={e.active ? "del" : "data"}
                                        >
                                          {e.content}
                                        </Text>
                                        <Spacer />
                                        <HStack>
                                          <Tooltip
                                            label="Edit"
                                            placement="top-start"
                                          >
                                            <IconButton
                                              variant="outline"
                                              aria-label="Edit"
                                              size="xs"
                                              icon={<EditIcon />}
                                              onClick={() => {
                                                setTodoCurrentId(e._id);
                                                setTodoCurrentContent(
                                                  e.content
                                                );
                                                onEditOpen();
                                              }}
                                            />
                                          </Tooltip>
                                          <Tooltip
                                            label="Delete"
                                            placement="top-start"
                                          >
                                            <IconButton
                                              variant="outline"
                                              aria-label="Delete"
                                              size="xs"
                                              icon={<SmallCloseIcon />}
                                              onClick={() => {
                                                setTodoCurrentId(e._id);
                                                onDelOpen();
                                              }}
                                            />
                                          </Tooltip>
                                        </HStack>
                                      </Flex>
                                    </ListItem>
                                    <Divider />
                                  </Box>
                                ))
                            ) : (
                              <ListItem>
                                <Flex gap={3} align="center" justify="center">
                                  <Text>There is no active to-do list.</Text>
                                </Flex>
                              </ListItem>
                            )}
                          </List>
                        </TabPanel>
                        <TabPanel
                          overflowY="scroll"
                          h="360px"
                          css={scrollbarStyle}
                        >
                          <List spacing={3} fontSize="14px" fontWeight={300}>
                            {todos.filter((l: any) => l.active == true).length >
                            0 ? (
                              todos
                                .filter((f: any) => f.active == true)
                                .map((e: any, index: number) => (
                                  <Box key={e._id}>
                                    <ListItem mb="3">
                                      <Flex gap={3} align="center">
                                        <Checkbox
                                          id={e._id}
                                          defaultChecked={e.active}
                                          isChecked={e.active}
                                          disabled={checkboxDisable}
                                          onChange={(event) => {
                                            setCheckboxDisable(true);
                                            handleActive(
                                              e._id,
                                              event.target.checked
                                            );
                                          }}
                                        />
                                        <Text
                                          fontSize="16px"
                                          as={e.active ? "del" : "data"}
                                        >
                                          {e.content}
                                        </Text>
                                        <Spacer />
                                        <HStack>
                                          <Tooltip
                                            label="Edit"
                                            placement="top-start"
                                          >
                                            <IconButton
                                              variant="outline"
                                              aria-label="Edit"
                                              size="xs"
                                              icon={<EditIcon />}
                                              onClick={() => {
                                                setTodoCurrentId(e._id);
                                                setTodoCurrentContent(
                                                  e.content
                                                );
                                                onEditOpen();
                                              }}
                                            />
                                          </Tooltip>
                                          <Tooltip
                                            label="Delete"
                                            placement="top-start"
                                          >
                                            <IconButton
                                              variant="outline"
                                              aria-label="Delete"
                                              size="xs"
                                              icon={<SmallCloseIcon />}
                                              onClick={() => {
                                                setTodoCurrentId(e._id);
                                                onDelOpen();
                                              }}
                                            />
                                          </Tooltip>
                                        </HStack>
                                      </Flex>
                                    </ListItem>
                                    <Divider />
                                  </Box>
                                ))
                            ) : (
                              <ListItem>
                                <Flex gap={3} align="center" justify="center">
                                  <Text>There is no completed to-do list.</Text>
                                </Flex>
                              </ListItem>
                            )}
                          </List>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <UpdateModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        todoId={todoCurrentId}
        todoContent={todoCurrentContent}
      />
      <DeleteModal
        isOpen={isDelOpen}
        onClose={onDelClose}
        todoId={todoCurrentId}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (session) {
    const { connect } = await connectMongoDB();
    const getUserId = await User.findById(session.sub);
    if (getUserId) {
      if (getUserId.email && getUserId.name) {
        return {
          props: { user: { email: getUserId.email, name: getUserId.name } },
        };
      } else {
        return {
          redirect: { destination: "/auth/newuser", permanent: false },
        };
      }
    } else {
      return { redirect: { destination: "/auth/signin", permanent: false } };
    }
  } else {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }
};

{
  /* <button
onClick={() => {
  signOut({ callbackUrl: `${process.env.HOSTNAME}/auth` });
}}
>
Signout
</button> */
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});
