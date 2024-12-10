import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { validateEmail, validatePassword } from "../../../utils/validation";

const Login = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useLogin();
  const [error, setError] = useState({ email: "", password: "" });

  const handleLogin = () => {
    const emailError = validateEmail(inputState.email);
    const passwordError = validatePassword(inputState.password);
    setError({ email: "", password: "" });
    if (emailError || passwordError) {
      if (emailError) {
        setError((prevError) => ({ ...prevError, email: emailError }));
        setInputState((prevInputs) => ({ ...prevInputs, email: "" }));
      }

      if (passwordError) {
        setError((prevError) => ({ ...prevError, password: passwordError }));
        setInputState((prevInputs) => ({ ...prevInputs, password: "" }));
      }
      return;
    }
    login(inputState);
  };
  return (
    <>
      {" "}
      <Input
        value={inputState.email}
        onChange={(e) =>
          setInputState({ ...inputState, email: e.target.value })
        }
        size={"sm"}
        placeholder="Email"
        fontSize={14}
        type="email"
      />
      {error.email && (
        <Text
          width={"90%"}
          mx={"auto"}
          my={1}
          fontSize={"xs"}
          color={"red.400"}
        >
          {error.email}
        </Text>
      )}
      <Input
        value={inputState.password}
        onChange={(e) =>
          setInputState({ ...inputState, password: e.target.value })
        }
        size={"sm"}
        placeholder="Password"
        fontSize={14}
        type="password"
      />
      {error.password && (
        <Text
          width={"90%"}
          mx={"auto"}
          my={1}
          fontSize={"xs"}
          color={"red.400"}
        >
          {error.password}
        </Text>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={handleLogin}
      >
        Login{" "}
      </Button>
    </>
  );
};

export default Login;
