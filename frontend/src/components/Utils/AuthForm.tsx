import { createSignal, Show, createResource } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import type { Accessor } from "solid-js";
import type { userType } from "@types/user";
import { Navigate } from "@solidjs/router";
import type { AxiosResponse } from "axios";
import InputForm from "./InputForm";
const AuthForm = () => {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = createSignal<userType>();
  const context = useUser();
  const loginUser = context?.loginUser;
  const [response] = createResource<Accessor<AxiosResponse>>(user, loginUser);
  return (
    <>
      <InputForm
        value={login}
        setValue={setLogin}
        response={response}
        errorCondition={() => response() && response().status === 404}
      />
      <InputForm
        value={password}
        setValue={setPassword}
        response={response}
        errorCondition={() => response() && response().status === 400}
      />
      <button
        class="rounded py-1 pt-2 text-center w-4/6 mt-4  text-white hover:text-gray-300  bg-black mt-2  text-sm border border-gray-300"
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
