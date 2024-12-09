import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
import { supabase } from "../../../utils/supase";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({ fullname: "", username: "", bio: "" });
  const fileRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();
  const showToast = useShowToast();
  const { editProfile, isUpdating } = useEditProfile();

  const [imageFile, setImageFile] = useState(null);

  const handleEditProfile = async () => {
    try {
      const fileExt = imageFile.name.split(".").pop().toLowerCase();

      const fileName = `posts/${authUser.uid}-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("image-storage") // Replace with your bucket name
        .upload(fileName, imageFile);

      if (error) {
        setSelectedFile(null);
        showToast("Error", "Please try to upload again", "error");
        throw new Error(
          `uploading image to supabase storage error ${error.message}`
        );
      }
      if (!data) {
        showToast("Error", "please try again.", "error");
        setSelectedFile(null);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("image-storage").getPublicUrl(fileName);
      if (!publicUrl) {
        showToast("Error", "please try to upload again.", "error");
        setSelectedFile(null);
      }

      await editProfile(publicUrl, inputs);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid #2A3439"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile || authUser.profilePicUrl}
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                      </Button>
                      <Input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={(e) => {
                          setImageFile(e.target.files[0]);
                          handleImageChange(e);
                        }}
                      />
                    </Center>
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                  <Input
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.fullname || authUser.fullname}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullname: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.username || authUser.username}
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Bio</FormLabel>
                  <Input
                    placeholder={"Bio"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.bio || authUser.bio}
                    onChange={(e) =>
                      setInputs({ ...inputs, bio: e.target.value })
                    }
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    isLoading={isUpdating}
                    onClick={handleEditProfile}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
