import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all field to login!", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      } else if (error) {
        showToast(
          "Error",
          "Please try again with a correct credential",
          "error"
        );
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { login, loading, error };
};

export default useLogin;
