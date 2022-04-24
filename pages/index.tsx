import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
// import { connect } from "../libs/mongoose";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { useRouter, type NextRouter } from "next/router";
import { signOut } from "next-auth/react";
import Index from "@/styles/home.module.css";
import Image from "next/image";

import {
  Container,
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
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon, EditIcon } from "@chakra-ui/icons";
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

type Props = {};
declare let document: any;
let router: NextRouter;
export default function Home({}: Props) {
  router = useRouter();
  // const { data: session, status } = useSession();
  // const loading = status === "loading";
  //const [content, setContent] = useState();
  // Fetch content from protected route
  //useEffect(() => {
  // const fetchData = async () => {
  //   const res = await fetch("/api/protected");
  //   const json = await res.json();
  //   if (json.content) {
  //     setContent(json.content);
  //   }
  // };
  // fetchData();
  //}, [session]);

  return (
    <>
      <Head>
        <title>IAM To do - IAMBLOCKCHAIN</title>
      </Head>
      <div className={Index.main}>
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

                  <p className={Index.profileName}>
                    Hello, Kritsana Wipankhet !
                  </p>
                  <p className={Index.profileEmail}>
                    kritsanawipankhet@icloud.com
                  </p>
                </div>

                <div className={Index.settingContent}>
                  <button
                    className={`${Index.buttonGlobal} ${Index.ghost} `}
                    id="signOut"
                    onClick={() => {
                      signOut({
                        redirect: true,
                        callbackUrl: `${process.env.HOSTNAME}/auth`,
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
                <ChakraProvider theme={theme}>
                  <Box pt={30} pl={30} pb={4} pr={30}>
                    <Flex gap={3}>
                      <Box flex="1">
                        <FormControl
                          variant="floating"
                          id="content"
                          // isRequired
                          // isInvalid
                        >
                          <Input placeholder=" " />
                          {/* It is important that the Label comes after the Control due to css selectors */}
                          <FormLabel>What do you need to do ?</FormLabel>
                          <FormHelperText>
                            Keep it very short and sweet!
                          </FormHelperText>
                          <FormErrorMessage>
                            Your First name is invalid
                          </FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box w="20%">
                        <Button
                          w="100%"
                          leftIcon={<AddIcon />}
                          colorScheme="blue"
                        >
                          Add
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
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
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox defaultChecked />
                                <Text as="del">
                                  Lorem ipsum dolor sit, amet consectetur
                                  adipisicing elit. Perferendis.
                                </Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox />
                                <Text>
                                  Lorem ipsum dolor sit amet consectetur.
                                </Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox />
                                <Text>Lorem ipsum dolor sit amet.</Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                          </List>
                        </TabPanel>
                        <TabPanel
                          overflowY="scroll"
                          h="360px"
                          css={scrollbarStyle}
                        >
                          <List spacing={3} fontSize="14px" fontWeight={300}>
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox />
                                <Text>
                                  Lorem ipsum dolor sit amet consectetur.
                                </Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox />
                                <Text>Lorem ipsum dolor sit amet.</Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                          </List>
                        </TabPanel>
                        <TabPanel
                          overflowY="scroll"
                          h="360px"
                          css={scrollbarStyle}
                        >
                          <List spacing={3} fontSize="14px" fontWeight={300}>
                            <ListItem>
                              <Flex gap={3} align="center">
                                <Checkbox defaultChecked />
                                <Text as="del">
                                  Lorem ipsum dolor sit, amet consectetur
                                  adipisicing elit. Perferendis.
                                </Text>
                                <Spacer />
                                <HStack>
                                  <IconButton
                                    variant="outline"
                                    aria-label="Edit"
                                    size="xs"
                                    icon={<EditIcon />}
                                  />
                                  <IconButton
                                    variant="outline"
                                    aria-label="Delete"
                                    size="xs"
                                    icon={<SmallCloseIcon />}
                                  />
                                </HStack>
                              </Flex>
                            </ListItem>
                            <Divider />
                          </List>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </ChakraProvider>
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
  if (!session) {
    return { redirect: { destination: "/auth", permanent: false } };
  }
  //const { conn } = await connect();
  // console.log(conn);
  return { props: {} };
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

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#f6f5f7",
    borderRadius: "24px",
  },
};

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
