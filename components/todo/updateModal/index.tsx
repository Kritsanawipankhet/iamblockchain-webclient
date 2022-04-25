import React, { useState, useEffect } from "react";
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialRef?: React.RefObject<HTMLInputElement>;
  finalRef?: React.RefObject<HTMLInputElement>;
};

export default function UpdateModal({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}: Props) {
  const [todo, setTodo] = useState(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis."
  );

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit To do List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ChakraProvider theme={theme}>
              <FormControl
                variant="floating"
                id="content"
                // isRequired
                // isInvalid
              >
                <Input
                  ref={initialRef}
                  placeholder=" "
                  value={todo}
                  onChange={(e) => {
                    setTodo(e.target.value);
                  }}
                />
                {/* It is important that the Label comes after the Control due to css selectors */}
                <FormLabel>What would you like to change?</FormLabel>
                {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
              </FormControl>
            </ChakraProvider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
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
