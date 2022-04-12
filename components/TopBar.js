import Link from "next/link";
import { Flex, Heading, Avatar } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const TopBar = ({ email }) => {
  return (
    <Flex bg="teal.600" h="10%" w="100%" align="center" p={5}>
      <Link href="/" passHref>
        <FaArrowLeft cursor="pointer" size="1.5em" color="white" />
      </Link>
      <Avatar src="" marginEnd={3} ml={5} />
      <Heading size="md" color="white">
        {email}
      </Heading>
    </Flex>
  );
};

export default TopBar;
