import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

import useSignUpEmailPassword from "../../hooks/useSignUpEmailPassword";
import { validateEmail, validatePassword } from "../../../utils/validation";
const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, SignupAction } = useSignUpEmailPassword();
  const [error, setError] = useState({ email: "", password: "" });

  const handleSignUp = () => {
    const emailError = validateEmail(inputs.email);
    const passwordError = validatePassword(inputs.password);
    setError({ email: "", password: "" });
    if (emailError || passwordError) {
      if (emailError) {
        setError((prevError) => ({ ...prevError, email: emailError }));
        setInputs((prevInputs) => ({ ...prevInputs, email: "" }));
      }

      if (passwordError) {
        setError((prevError) => ({ ...prevError, password: passwordError }));
        setInputs((prevInputs) => ({ ...prevInputs, password: "" }));
      }
      return;
    }
    SignupAction(inputs);
  };
  return (
    <>
      <Input
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
      {error.password && (
        <Text
          width={"90%"}
          mx={"auto"}
          fontSize={"xs"}
          my={1}
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
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
