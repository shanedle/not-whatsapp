import { useRouter } from "next/router";
import { collection, addDoc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Center, Avatar, Button, Flex, Text, Spinner } from "@chakra-ui/react";

import { auth } from "../firebaseconfig";
import { db } from "../firebaseconfig";

import getRecipient from "../utils/getRecipient";

const Chat = () => {
  const router = useRouter();

  const [user] = useAuthState(auth);

  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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

  const newChat = async () => {
    const input = prompt("Enter the email of the recipient.");

    if (input != null && input.length > 0) {
      if (!chatExists(input) && input !== user.email) {
        await addDoc(collection(db, "chats"), { users: [user.email, input] });
      }
    }
  };

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

      <Button m={3} p={3} onClick={() => newChat()}>
        Start a chat
      </Button>
    </Flex>
  );
};

export default Chat;
