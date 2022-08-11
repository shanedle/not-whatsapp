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
import { db } from "../../firebaseconfig";

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
      if (input != null && input.length > 0) {
        if (/\S/.test(input)) {
          await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp(),
          });
          setInput("");
        }
      }
    } catch (err) {
      console.log(err);
    }
    setShowEmoji(false);
  };

  return (
    <FormControl
      pos="absolute"
      bottom="0"
      left="0"
      p={3}
      onSubmit={sendMessage}
      as="form"
    >
      {showEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{
            display: "relative",
            left: "0",
            bottom: "10px",
            backgroundColor: "#fff",
            zIndex: "10",
          }}
        />
      )}
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
    </FormControl>
  );
}
