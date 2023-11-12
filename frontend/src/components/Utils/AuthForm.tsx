import { createSignal, Show, createResource } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import type { Accessor } from "solid-js";
import type { userType } from "@types/user";
import { Navigate } from "@solidjs/router";
import { AxiosResponse } from "axios";
const AuthForm = () => {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = createSignal<userType>();
  const context = useUser();
  const loginUser = context?.loginUser;
  const [response] = createResource<Accessor<AxiosResponse>>(user, loginUser);
  return (
    <>
      <input
        placeholder="Enter username"
        class={`rounded py-2 pt-3 w-4/6 text-sm mt-2 mb-1  pl-2 border border-gray-300 focus:outline-none ${
          response() && response().status === 404 && "border-red-400"
        }`}
        value={login()}
        onInput={(e) => {
          setLogin(e.target.value);
        }}
      />
      <Show when={response() && response().status === 404}>
        <p class="text-red-700 text-sm">{response().data.detail}</p>
      </Show>
      <input
        placeholder="Enter password"
        class={`rounded py-2 pt-3 w-4/6 text-sm mt-2 mb-1  pl-2 border border-gray-300 focus:outline-none ${
          response() && response().status === 400 && "border-red-400"
        }`}
        value={password()}
        onInput={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <Show when={response() && response().status === 400}>
        <p class="text-red-700 text-sm">{response().data.detail}</p>
      </Show>
      <button
        class="rounded py-1 pt-2 text-center w-4/6 mt-4  text-white bg-violet-700 mt-2  text-sm border border-gray-300"
        onClick={() => {
          setUser({ login: login(), password: password() });
        }}
      >
        Confirm
      </button>
      <Show when={response()}>
        <Show when={response().status === 200}>
          <Navigate href="/" />
        </Show>
      </Show>
    </>
  );
};
export default AuthForm;
