import { createContext, createSignal, useContext } from "solid-js";
import type { JSX, Component } from "solid-js";
import { onIdTokenChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "@/services/firebase";
import { Accessor } from "solid-js";
import { User as FirebaseUser } from "firebase/auth";

type LoginForm = {
  email: string;
  password: string;
};
type UserForm = {
  login: string;
  password: string;
  email: string;
};
type UserContextType = {
  loginUser: (user: LoginForm) => Promise<string>;
  createUser: (user: UserForm) => Promise<string>;
  user: Accessor<FirebaseUser | undefined>;
  login: Accessor<string | null>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);
const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [login, setLogin] = createSignal<string | null>("");
  const [user, setUser] = createSignal<User | undefined>();
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
    } catch (err: any) {
      console.error(typeof err);
      alert(err?.message);
      return err;
    }
  };
  const createUser = async (userForm: UserForm) => {
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
    } catch (err: any) {
      console.error(err);
      alert(err.message);
      return err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        login,
        logout,
        createUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext) as UserContextType;
export default UserProvider;
