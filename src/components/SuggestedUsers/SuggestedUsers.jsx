import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";

const SuggestedUsers = () => {
  const { isLoading, suggestedUser, getAllUsers } = useGetSuggestedUser();
  return (
    <VStack py={8} px={8} gap={4}>
      <SuggestedHeader />
      {suggestedUser.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
            onClick={getAllUsers}
          >
            See All
          </Text>
        </Flex>
      )}
      {isLoading && (
        <Box width={"full"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Flex my={1} alignItems={"center"} key={index}>
              <SkeletonCircle size={10} mr={"auto"} />
              <Skeleton height={2} width={100} />
            </Flex>
          ))}
        </Box>
      )}

      {!isLoading &&
        suggestedUser.map((user) => (
          <SuggestedUser user={user} key={user.uid} />
        ))}
    </VStack>
  );
};

export default SuggestedUsers;
