import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor } from "solid-js";
import type { userContextType, userType } from "@types/user";
import axios, { AxiosResponse } from "axios";

const UserContext = createContext<userContextType>();
const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [login, setLogin] = createSignal("");
  const [token, setToken] = createSignal(
    localStorage.getItem("jwt-token") ?? ""
  );
  const handleToken = async () => {
    if (token() && localStorage.getItem("jwt-token") !== token()) {
      localStorage.setItem("jwt-token", token());
    }
    if (token()) {
      const response = await axios.get("http://localhost:8000/user", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      response.status === 200 && setLogin(response.data.login);
    }
  };

  createEffect(() => {
    handleToken();
  });

  const logout: () => void = () => {
    if (token()) {
      localStorage.removeItem("jwt-token");
      setLogin("");
      setToken("");
    }
  };

  const loginUser = async (user: userType) => {
    if (user) {
      const response: AxiosResponse = await axios
        .post("http://localhost:8000/user/login", user)
        .catch((error) => {
          return error.response;
        });
      if (response.status === 200) {
        setToken(response.data);
        return response;
      }
      return response;
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
