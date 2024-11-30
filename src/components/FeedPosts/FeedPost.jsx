import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ img, username, avatar }) => {
  return (
    <>
      <PostHeader avatar={avatar} username={username} />
      <Box my={2} overflow={"hidden"} borderRadius={10}>
        <Image src={img} alt="profile picture" />
      </Box>
      <PostFooter username={username} />
    </>
  );
};

export default FeedPost;
