import { useRouter } from "next/router";
import {
  Center,
  Avatar,
  Button,
  Flex,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth } from "../../firebaseconfig";
import { db } from "../../firebaseconfig";

import getRecipient from "../../utils/getRecipient";

export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register } = useForm();

  const router = useRouter();

  const [user] = useAuthState(auth);

  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const toast = useToast();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const resultToast = (status, title, description) => {
    return toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };

  const submitHandler = handleSubmit(async ({ email }) => {
    if (email != null && email.length > 0) {
      if (!chatExists(email) && email !== user.email) {
        await addDoc(collection(db, "chats"), { users: [user.email, email] });
        resultToast("success", `${email} added.`, "Email added successfully.");
      } else if (chatExists(email) && email !== user.email) {
        resultToast(
          "error",
          `${email} already exist.`,
          "Please enter a different email."
        );
      } else {
        resultToast(
          "error",
          "You can't add your own email!",
          "Please enter a different email."
        );
      }
      onClose();
    }
  });

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getRecipient(chat.users, user)}</Text>
        </Flex>
      ));
  };

  return (
    <Flex
      h="90%"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {chatList()}
      </Flex>

      <Button onClick={onOpen}> Start a chat</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={submitHandler}>
          <ModalHeader>Enter the email of the recipient</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                type="email"
                placeholder="example@email.com"
                name="email"
                {...register("email", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
