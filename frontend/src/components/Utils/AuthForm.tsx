import { createSignal, Show, createResource } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import type { Accessor } from "solid-js";
import type { userType } from "@types/user";
import { Navigate } from "@solidjs/router";
const AuthForm = () => {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = createSignal<userType>();
  const context = useUser();
  const loginUser = context?.loginUser;
  const [data] = createResource<Accessor<any>>(user, loginUser);
  return (
    <>
      <input
        placeholder="Enter username"
        class="rounded py-2 pt-3 w-4/6 text-sm mt-2 mb-1  pl-2 border border-gray-300 focus:outline-none"
        value={login()}
        onInput={(e) => {
          setLogin(e.target.value);
        }}
      />
      <input
        placeholder="Enter password"
        class="rounded py-2  pt-3 w-4/6 text-sm mt-2  pl-2 border border-gray-300 focus:outline-none"
        value={password()}
        onInput={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <button
        class="rounded py-1 pt-2 text-center w-4/6 mt-4  text-white bg-violet-700 mt-2  text-sm border border-gray-300"
        onClick={() => {
          setUser({ login: login(), password: password() });
        }}
      >
        Confirm
      </button>
      <Show when={!data()} fallback={<Navigate href="/" />} />
    </>
  );
};
export default AuthForm;
