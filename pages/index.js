import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div>
      <Box h="100vh">
        <Header />
        <Chat />
      </Box>
    </div>
  );
};

export default Home;
