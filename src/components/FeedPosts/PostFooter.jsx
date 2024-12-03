import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  UnlikeLogo,
  NotificationsLogo,
  CommentLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post, username, isProfilePage }) => {
  const [comment, setComment] = useState("");

  const { isLoading, handlePostComment } = usePostComment();

  const commentInputRef = useRef(null);

  const authUser = useAuthStore((state) => state.user);

  const { handleLikePost, isLiked, likes } = useLikePost(post);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentInputRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {username}_{" "}
            <Text as="span" fontWeight={400}>
              Feeling good
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"}>
            {" "}
            view all 1,000 comments
          </Text>
        </>
      )}

      <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
      >
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder={"Add a comment..."}
            fontSize={14}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            isDisabled={!authUser}
            ref={commentInputRef}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              onClick={handleSubmitComment}
              isLoading={isLoading}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
