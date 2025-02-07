import { Box, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { InstagramLogo } from "../../assets/constants";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box
        width={"full"}
        border={"1px solid gray"}
        borderRadius={10}
        paddingY={10}
        paddingX={5}
      >
        <VStack spacing={5} mx={"auto"}>
          <InstagramLogo />
          {isLogin ? <Login /> : <Signup />}
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign up" : "Login"}{" "}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
