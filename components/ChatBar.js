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

export default function ChatBar({ id, user }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaRegSmile />
        </InputLeftElement>
        <Input
          bg="white"
          placeholder="Message"
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <InputRightElement pointerEvents="none">
          <FaCamera />
        </InputRightElement>
      </InputGroup>

      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
}
