import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useColorMode,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { auth } from "../../firebaseconfig";

export default function UserProfile() {
  const [user] = useAuthState(auth);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack spacing="4">
              <Avatar size="md" src={user.photoURL} />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="lg">{user.displayName}</Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <ChevronDownIcon />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList fontSize="lg" bg="teal.600">
            <MenuItem onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </MenuItem>
            <MenuItem onClick={() => signOut(auth)}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
