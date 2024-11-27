import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleAuth = () => {
    if (!inputState.email || !inputState.password) {
      alert("Fill The Login Form Please!");
      return;
    }
    console.log("inputs", inputState);
    navigate("/");
  };
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram" />
          <Input
            value={inputState.email}
            onChange={(e) =>
              setInputState({ ...inputState, email: e.target.value })
            }
            placeholder="Email"
            fontSize={14}
            type="email"
          />
          <Input
            value={inputState.password}
            onChange={(e) =>
              setInputState({ ...inputState, password: e.target.value })
            }
            placeholder="Password"
            fontSize={14}
            type="password"
          />
          {!isLogin ? (
            <Input
              value={inputState.confirmPassword}
              onChange={(e) =>
                setInputState({
                  ...inputState,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm password"
              fontSize={14}
              type="password"
            />
          ) : null}
          <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
            onClick={handleAuth}
          >
            {isLogin ? "Login" : "Sing up"}
          </Button>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
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
