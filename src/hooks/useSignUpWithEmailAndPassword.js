import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  // this hook performs the sign in and returns the user credential if sign in is successfull and else returens undefined.
  //   it wraps the underlying firebase.auth().createUserWithEmailAndPassword()

  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  // access the zustand store.
  // extracting the login action
  // we can call a function loginUser with the user data object to update the state.
  const loginUser = useAuthStore((state) => state.login);

  const SignupAction = async (inputs) => {
    if (
      !inputs.username ||
      !inputs.email ||
      !inputs.fullname ||
      !inputs.password
    ) {
      showToast("Error", "Please fill all field", "error");
      return;
    }
    const usersRef = collection(firestore, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);
    console.log("check for username", querySnapshot);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exist!", "error");
      return;
    }
    try {
      // passing email and password to the function if success it returns the instance of the user credential else it will be undefined.
      console.log(inputs.email, inputs.password);

      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) {
        console.log("not successfull");
        return;
      }
      if (newUser) {
        showToast(
          "Sign Up successful",
          "Your signed up successfully",
          "success"
        );
        // this the user document that is going to be stored for the authenticated user in the firestore database of firebase.
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullname: inputs.fullname,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
    }
  };

  return { loading, error, SignupAction };
};

export default useSignUpWithEmailAndPassword;
