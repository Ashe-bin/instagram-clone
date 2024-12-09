import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollowUser from "../../hooks/useFollowUnfollowUser";
import { timeAgo } from "../../../utils/timeAgo";

const PostHeader = ({ post, userProfile, isLoading }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUnfollowUser(
    post.createdBy
  );

  if (isLoading) {
    return (
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"full"}
        my={2}
      >
        <Flex gap="2">
          <SkeletonCircle size="10" />
          <Flex gap={2} alignItems={"center"}>
            <Skeleton height="10px" w={"200px"} />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar
            src={userProfile?.profilePicUrl}
            alt="use profile"
            size={"sm"}
          />
        </Link>
        <Link to={`/${userProfile?.username}`}>
          <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            {userProfile?.username}
            <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
          </Flex>
        </Link>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={{ basic: "sm", md: "md" }}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          isLoading={isUpdating}
          onClick={handleFollowUser}
        >
          {isFollowing ? "unFollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
