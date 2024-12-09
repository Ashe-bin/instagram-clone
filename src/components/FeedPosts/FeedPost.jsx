import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileById(post.createdBy);

  return (
    <Box>
      <PostHeader post={post} userProfile={userProfile} isLoading={isLoading} />
      <Box my={2} overflow={"hidden"} borderRadius={10}>
        <Image
          src={post.imageURL}
          alt="Feed post image"
          objectFit={"contain"}
          maxW={"100%"}
          maxH={"500px"}
        />
      </Box>
      <PostFooter post={post} userProfile={userProfile} />
    </Box>
  );
};

export default FeedPost;
