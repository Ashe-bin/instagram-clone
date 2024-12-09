import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useLogin();
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
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => login(inputState)}
      >
        Login{" "}
      </Button>
    </>
  );
};

export default Login;
