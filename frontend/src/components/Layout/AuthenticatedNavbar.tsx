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
        <p class="border-b  font-medium pb-1 pr-3 w-auto ">{login()}</p>
        <button
          class="hover:bg-gray-100 w-full pr-4 text-left"
          onClick={logout}
        >
          logout
        </button>
      </Dropdown>
    </>
  );
};
export default AuthenticatedNavbar;
