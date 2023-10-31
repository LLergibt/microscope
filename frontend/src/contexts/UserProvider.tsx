import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor } from "solid-js";
import type { userContextType, userType } from "@types/user";
import axios from "axios";

const UserContext = createContext<userContextType>();
const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [token, setToken] = createSignal(
    localStorage.getItem("jwt-token") ?? ""
  );
  const [login, setLogin] = createSignal("");
  const handleToken = async () => {
    if (token() && localStorage.getItem("jwt-token") !== token()) {
      localStorage.setItem("jwt-token", token());
    }
    if (token()) {
      const response = await axios("http://localhost:8000/get-user", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      response.status === 200 && setLogin(response.data.login);
    }
  };
  const logout: () => void = () => {
    if (token()) {
      localStorage.removeItem("jwt-token");
      setLogin("");
      setToken("");
    }
  };

  createEffect(() => {
    handleToken();
  });
  const loginUser = async (user: userType) => {
    if (user) {
      const responseRaw = await fetch("http://localhost:8000/login/", {
        body: JSON.stringify({
          login: user.login,
          password: user.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const token: string = await responseRaw.json();
      setToken(token);
      return token;
    }
  };

  return (
    <UserContext.Provider value={{ loginUser, token, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
export default UserProvider;
