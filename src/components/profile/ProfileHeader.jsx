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
import useFollowUnfollowUser from "../../hooks/useFollowUnfollowUser";
const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUnfollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuthenticated =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuthenticated =
    authUser && authUser.username !== userProfile.username;

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  return (
    <Flex>
      <Flex
        gap={{ base: 6, sm: 20 }}
        py={6}
        my={"5px"}
        direction={{ base: "column", sm: "row" }}
        alignItems={{ sm: "center", md: "center" }}
        justifyItems={{ base: "center" }}
        flexWrap={"wrap"}
        mx={4}
      >
        <AvatarGroup
          size={{ base: "xl", md: "2xl" }}
          justifySelf={"center"}
          alignSelf={"center"}
          mx={"auto"}
        >
          <Avatar src={userProfile.profilePicUrl} alt="profile picture" />
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
            <Flex gap={1} alignItems={"center"} justifyContent={"center"}>
              {visitingOwnProfileAndAuthenticated && (
                <>
                  <Button
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "whiteAlpha.800" }}
                    size={{ base: "sm", md: "md" }}
                    onClick={onEditOpen}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
              {visitingAnotherProfileAndAuthenticated && (
                <Button
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{ bg: "blue.600" }}
                  size={{ base: "xs", md: "sm" }}
                  isLoading={isUpdating}
                  onClick={handleFollowUser}
                >
                  {isFollowing ? "unFollow" : "Follow"}
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
            <Text fontSize={{ base: "sm", md: "lg" }}>
              <Text
                as="span"
                fontWeight={"bold"}
                fontSize={{ base: "sm", md: "lg" }}
                mr={1}
              >
                {userProfile.posts.length}
              </Text>
              Posts
            </Text>
            <Text fontSize={{ base: "sm", md: "lg" }}>
              <Text
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"bold"}
                mr={1}
              >
                {userProfile.followers.length}
              </Text>
              Followers
            </Text>
            <Text fontSize={{ base: "sm", md: "lg" }}>
              <Text
                as="span"
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight={"bold"}
                mr={1}
              >
                {userProfile.following.length}
              </Text>
              Following
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={{ base: "sm", md: "lg" }} fontWeight={"bold"}>
              {userProfile.fullname}
            </Text>
          </Flex>
          <Text fontSize={"md"}>{userProfile.bio}</Text>
        </VStack>
        {isEditOpen && (
          <EditProfile isOpen={isEditOpen} onClose={onEditClose} />
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileHeader;
