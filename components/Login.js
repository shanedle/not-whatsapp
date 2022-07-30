import Head from "next/head";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Spinner, Button, Center, Stack } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

import { auth } from "../firebaseconfig";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Center h="100vh">
        <Stack
          align="center"
          bgColor="green"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <FaWhatsapp size="6em" color="white" />

          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}
