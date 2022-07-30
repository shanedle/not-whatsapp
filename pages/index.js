import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div>
      <Box h="100vh">
        <Header />
        <Chat />
      </Box>
    </div>
  );
}
