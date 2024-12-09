import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpwithEmailandPassword";
// use hook to perform sign up operation
const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, SignupAction } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        fontSize={14}
        type="email"
      />
      <Input
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        placeholder="Username"
        fontSize={14}
        type="text"
      />
      <Input
        value={inputs.fullname}
        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
        placeholder="Full Name"
        fontSize={14}
        type="text"
      />
      <InputGroup>
        <Input
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => SignupAction(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
