import Link from "next/link";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { Flex, Heading, Avatar } from "@chakra-ui/react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";

import { db } from "../firebaseconfig";

const TopBar = ({ id, email }) => {
  const router = useRouter();
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
      <div className="deleteButton" onClick={() => handleDelete(id)}>
        <FaTrashAlt cursor="pointer" size="1.5em" color="white" />
      </div>
    </Flex>
  );
};

export default TopBar;
