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
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              href="/login"
            >
              login
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
