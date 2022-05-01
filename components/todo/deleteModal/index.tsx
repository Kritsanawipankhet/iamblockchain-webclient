import React, { useState, useRef } from "react";
import {
  ChakraProvider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  extendTheme,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef?: React.RefObject<HTMLInputElement>;
  todoId: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  cancelRef,
  todoId,
}: Props) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const handleDelete = async (_id: string) => {
    const deleteTodo = await fetch("/api/todo/delete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId: _id }),
    })
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          onClose();
          setBtnDisabled(false);
        }, 500);
      });
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={!btnDisabled}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete To do List
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&rsquo;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button disabled={btnDisabled} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={btnDisabled}
                colorScheme="red"
                loadingText="DELETING"
                onClick={() => {
                  setBtnDisabled(true);
                  handleDelete(todoId);
                }}
                ml={3}
                disabled={btnDisabled}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
