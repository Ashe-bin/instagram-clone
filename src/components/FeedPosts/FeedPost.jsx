import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileById(post.createdBy);
  const isVideo =
    post?.imageURL.includes("mp4") ||
    post?.imageURL.includes("mov") ||
    post?.imageURL.includes("avi");
  return (
    <Box>
      <PostHeader post={post} userProfile={userProfile} isLoading={isLoading} />
      <Box my={2} overflow={"hidden"} borderRadius={10}>
        {isVideo ? (
          <video
            src={post.imageURL}
            alt="Post Video"
            controls
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
        ) : (
          <Image
            src={post.imageURL}
            alt="Post Image"
            maxH={"100%"}
            maxW={"500px"}
            objectFit={"cover"}
          />
        )}
      </Box>
      <PostFooter post={post} userProfile={userProfile} />
    </Box>
  );
};

export default FeedPost;
