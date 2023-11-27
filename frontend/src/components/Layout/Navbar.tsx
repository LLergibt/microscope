import { A, Outlet } from "@solidjs/router";
import { useUser } from "../../contexts/UserProvider";
import { Show } from "solid-js";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
const Navbar = () => {
  const context = useUser();
  const login = context?.login;

  return (
    <>
      <div class="pb-6 border-gray-300 border-b w-screen  ">
        <Show
          when={login && login() !== ""}
          fallback={
            <A
              class="text-gray-600 transition-colors hover:text-black"
              href="/login"
            >
              Login
            </A>
          }
        >
          <AuthenticatedNavbar />
        </Show>
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
