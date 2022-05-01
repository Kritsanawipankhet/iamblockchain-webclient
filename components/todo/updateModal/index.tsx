import React, { useState, useEffect, useRef } from "react";
import {
  ChakraProvider,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  extendTheme,
} from "@chakra-ui/react";
import { Formik } from "formik";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
  todoContent: string;
};

export default function UpdateModal({
  isOpen,
  onClose,
  todoId,
  todoContent,
}: Props) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const initialRef: any = React.useRef();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={!btnDisabled}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              todoId: todoId,
              todoContent: todoContent,
            }}
            validate={(values) => {
              const errors: any = {};
              if (values.todoContent.length < 2) {
                errors.todoContent = "Content todo-list too short.";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setBtnDisabled(true);
              const handleUpdate = async (_values: any) => {
                //console.log(values.todoId);
                const updateTodo = await fetch("/api/todo/edit/", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    todoId: _values.todoId,
                    content: _values.todoContent,
                  }),
                })
                  .then((response) => response.json())
                  .then((json) => {
                    setTimeout(() => {
                      onClose();
                      setSubmitting(true);
                      setBtnDisabled(true);
                    }, 1000);
                  });
              };
              handleUpdate(values);
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
                <ModalHeader>Edit To do List </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <ChakraProvider theme={theme}>
                    <FormControl
                      variant="floating"
                      id="content"
                      isInvalid={
                        errors.todoContent &&
                        touched.todoContent &&
                        errors.todoContent
                          ? true
                          : false
                      }
                    >
                      <Input
                        id="todoContent"
                        name="todoContent"
                        type="text"
                        ref={initialRef}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.todoContent}
                        disabled={isSubmitting}
                        placeholder=" "
                        autoComplete="off"
                        required={true}
                      />
                      {/* It is important that the Label comes after the Control due to css selectors */}
                      <FormLabel>What would you like to change?</FormLabel>

                      {errors.todoContent &&
                      touched.todoContent &&
                      errors.todoContent ? (
                        <FormErrorMessage fontSize="xs">
                          {errors.todoContent}
                        </FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </ChakraProvider>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    loadingText="EDITING"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button disabled={isSubmitting} onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
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
