import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { Flex, Text } from "@chakra-ui/react";

import { db, auth } from "../../firebaseconfig";
import getRecipient from "../../utils/getRecipient";
import TopBar from "../../components/TopBar/TopBar";
import ChatBar from "../../components/ChatBar/ChatBar";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-end" : "flex-start"}
          bg={sender ? "green.100" : "gray.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  useEffect(
    () =>
      setTimeout(
        bottomOfChat.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
        100
      ),
    [messages]
  );

  return (
    <Flex h="100vh">
      <Head>
        <title>Not WhatsApp Chat</title>
      </Head>

      <Flex flex={1} direction="column" className="chat-container">
        <TopBar id={id} email={getRecipient(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <ChatBar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
