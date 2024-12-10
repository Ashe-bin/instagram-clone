import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(firestore, "users");
      const q = query(
        usersRef,
        where("uid", "not-in", [authUser.uid, ...authUser.following]),
        orderBy("uid")
      );

      const querySnapShot = await getDocs(q);
      const users = [];
      querySnapShot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setSuggestedUser(users);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getSuggestedUser = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(6)
        );

        const querySnapShot = await getDocs(q);
        const users = [];
        querySnapShot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUser(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getSuggestedUser();
  }, [authUser, showToast]);
  return { isLoading, suggestedUser, getAllUsers };
};

export default useGetSuggestedUser;
