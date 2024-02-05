import { A } from "@solidjs/router";
import { useUser } from "@/contexts/UserProvider";
import { Show } from "solid-js";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
const Navbar = () => {
  const { login } = useUser();

  return (
    <>
      <div class="pb-6 border-gray-300 border-b w-screen">
        <Show
          when={login()}
          fallback={
            <>
              <A
                class="text-gray-600 underline transition-colors mr-2 hover:text-black"
                href="/login"
              >
                Login
              </A>
              <A
                class="text-gray-600 underline transition-colors hover:text-black"
                href="/signup"
              >
                Signup
              </A>
            </>
          }
        >
          <AuthenticatedNavbar />
        </Show>
      </div>
    </>
  );
};
export default Navbar;
