import { Flex } from "@chakra-ui/react";

const PostHeader = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap="2"></Flex>
    </Flex>
  );
};

export default PostHeader;
