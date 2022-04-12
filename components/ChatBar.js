import { useState } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import {
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaRegSmile, FaCamera } from "react-icons/fa";

import { db } from "../firebaseconfig";

const ChatBar = ({ id, user }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <InputGroup>
        <InputLeftElement children={<FaRegSmile />} />
        <Input
          bg="white"
          placeholder="Message"
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <InputRightElement children={<FaCamera />} />
      </InputGroup>

      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};

export default ChatBar;
