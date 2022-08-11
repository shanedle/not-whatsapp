import { Box } from "@chakra-ui/react";
import Header from "../components/Header/Header";
import Chat from "../components/Chat/Chat";

export default function Home() {
  return (
    <>
      <Box h="100vh">
        <Header />
        <Chat />
      </Box>
    </>
  );
}
