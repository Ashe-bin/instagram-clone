import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import { useLocation } from "react-router-dom";
import useCloudinaryUpload from "../../hooks/useCloudinaryImageUpload";

const CreatePost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [caption, setCaption] = useState("");
  const showToast = useShowToast();

  const { isLoading, handleCreatePost } = useCreatePost();
  const {
    cloudinaryImgUpload,
    uploadError,
    uploadedImgURL,
    setUploadedImgURL,
  } = useCloudinaryUpload();

  const handlePostCreation = async () => {
    try {
      if (uploadError) {
        showToast("Error", "please try to upload again.", "error");
        return;
      }
      await handleCreatePost(uploadedImgURL[0], caption);
      onClose();
      setCaption("");
      setUploadedImgURL([]);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const isVideo = (url) => {
    return url && url.endsWith(".mp4");
  };

  const isImage = (url) => {
    return (
      url &&
      (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))
    );
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{
            base: "center",
            md: "flex-start",
          }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <BsFillImageFill
              onClick={() => cloudinaryImgUpload()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {uploadedImgURL[0] && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                {/* Conditional Rendering for Image or Video */}
                {isImage(uploadedImgURL[0]) && (
                  <Image src={uploadedImgURL[0]} alt="selected image" />
                )}

                {isVideo(uploadedImgURL[0]) && (
                  <video width="100%" controls>
                    <source src={uploadedImgURL[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setUploadedImgURL([]);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState();
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (uploadedImgURL, caption) => {
    if (isLoading) return;
    if (!uploadedImgURL) {
      showToast("Error", "Please select an image to post", "error");
      return;
    }
    setIsLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      if (!uploadedImgURL) {
        showToast("Error", "please try to upload again.", "error");
      }

      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);

      await updateDoc(userDocRef, {
        posts: arrayUnion(postDocRef.id),
      });

      await updateDoc(postDocRef, { imageURL: uploadedImgURL });

      newPost.imageURL = uploadedImgURL;

      if (pathname !== "/" && userProfile.uid === authUser.uid) {
        createPost({ ...newPost, id: postDocRef.id });

        addPost({ ...newPost, id: postDocRef.id });
      }
      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", "please try again", "error");
      throw new Error(
        `error in the create post while uploading a file to supbase image storage error: ${error.message} `
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
