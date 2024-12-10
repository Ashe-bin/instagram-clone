import { Flex, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(1.1);
  }
  
  100% {
    transform: scale(1);
  }
`;
const IconLoading = () => {
  return (
    <Flex
      height={"100vh"}
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        display={"block"}
        bg={"transparent"}
        src="/insta.png"
        height={200}
        width={200}
        objectFit={"contain"}
        animation={`${heartbeat} 2s infinite`}
      />
    </Flex>
  );
};

export default IconLoading;
