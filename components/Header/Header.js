import { Flex, Text } from "@chakra-ui/react";
import UserProfile from "../UserProfile/UserProfile";

export default function Header() {
  return (
    <Flex
      ml={{ base: 0 }}
      px="4"
      position="sticky"
      top="0"
      height="10%"
      zIndex="1"
      alignItems="center"
      bg="teal.600"
      color="white"
      justifyContent={{ base: "space-between" }}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Not WhatsApp
      </Text>

      <UserProfile />
    </Flex>
  );
}
