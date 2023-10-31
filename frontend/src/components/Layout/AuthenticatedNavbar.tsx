import { useUser } from "../../contexts/UserProvider";
import Dropdown from "../Utils/Dropdown";
import type { Component } from "solid-js";

const AuthenticatedNavbar: Component = () => {
  const context = useUser();
  const login = context?.login;
  const logout = context?.logout;
  return (
    <>
      <Dropdown buttonValue={login}>
        <button onClick={logout}>logout</button>
      </Dropdown>
    </>
  );
};
export default AuthenticatedNavbar;
