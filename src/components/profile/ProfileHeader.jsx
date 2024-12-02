import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "../profile/EditProfile";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const visitingOwnProfileAndAuthenticated =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuthenticated =
    authUser && authUser.username !== userProfile.username;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
      justifyItems={{ base: "center" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"center"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicUrl} alt="programmer" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            {visitingOwnProfileAndAuthenticated && (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            )}
            {visitingAnotherProfileAndAuthenticated && (
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
              >
                Follow
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex
          fontSize={{ base: "xs", md: "sm" }}
          alignItems={"center"}
          gap={{ base: 2, sm: 4 }}
          wrap={"wrap"}
        >
          <Text>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullname}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
