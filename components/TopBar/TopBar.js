import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import {
  useDisclosure,
  Flex,
  Heading,
  Avatar,
  Box,
  Spacer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";

import { db } from "../../firebaseconfig";

export default function TopBar({ id, email }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `chats/${id}`));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex bg="teal.600" h="10%" w="100%" align="center" p={5}>
      <Link href="/" passHref>
        <FaArrowLeft cursor="pointer" size="1.5em" color="white" />
      </Link>
      <Avatar src="" marginEnd={3} ml={5} />
      <Heading size="md" color="white">
        {email}
      </Heading>
      <Spacer />
      <Box className="deleteButton">
        <FaTrashAlt
          cursor="pointer"
          size="1.5em"
          color="white"
          onClick={onOpen}
        />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Recipient
              </AlertDialogHeader>

              <AlertDialogBody>Are you sure?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Flex>
  );
}
