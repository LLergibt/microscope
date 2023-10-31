import { A, Outlet } from "@solidjs/router";
import { useUser } from "../../contexts/UserProvider";
import { Show } from "solid-js";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
const Navbar = () => {
  const context = useUser();
  const login = context?.login;

  return (
    <>
      <div class="h-28 w-screen  bg-gray-200">
        <Show
          when={login && login() !== ""}
          fallback={<A href="/login">login</A>}
        >
          <AuthenticatedNavbar />
        </Show>
        <Outlet />
      </div>
    </>
  );
};
export default Navbar;
