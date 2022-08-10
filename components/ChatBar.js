import { useState } from "react";
import dynamic from "next/dynamic";
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

const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

export default function ChatBar({ id, user }) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

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
    setShowEmoji(false);
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <InputGroup>
        <InputLeftElement>
          <FaRegSmile onClick={() => setShowEmoji(!showEmoji)} />
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
      {showEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{
            width: "20%",
            display: "absolute",
            left: "0",
            bottom: "270px",
            backgroundColor: "#fff",
          }}
        />
      )}
    </FormControl>
  );
}
