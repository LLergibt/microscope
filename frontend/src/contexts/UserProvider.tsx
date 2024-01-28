import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor } from "solid-js";
import type { userContextType, userType } from "@types/user";
import { onIdTokenChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import axios from "axios";

const UserContext = createContext<userContextType>();
const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [login, setLogin] = createSignal("");
  const [user, setUser] = createSignal();
  onIdTokenChanged(auth, (authUser) => {
    if (authUser) {
      setUser(authUser);
      setLogin(authUser.displayName);
    }
  });

  const logout: () => void = async () => {
    await auth.signOut();
    setLogin("");
    setUser();
  };

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.error(err);
      alert(err.message);
      return err;
    }
  };
  const createUser = async (userForm: userType) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userForm.email,
        userForm.password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userForm.login,
        }).catch((err) => console.log(err));
        await auth.currentUser.reload();

        return true;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
      return err;
    }
  };
  const getIsOwner = async (roomUid: string) => {
    const microscopeDoc = doc(db, "rooms", roomUid);
    const microscope = await getDoc(microscopeDoc);
    return microscope.data().owners.includes(user().uid);
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        login,
        getIsOwner,
        logout,
        createUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
export default UserProvider;
