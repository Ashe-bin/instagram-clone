import { Container, Flex, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container width={{ sm: "container.sm", md: "container.md" }}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <VStack spacing={4} align={"stretch"} width={"full"}>
            <AuthForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
