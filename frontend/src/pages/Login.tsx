import ModalTemplate from "@/components/Utils/ModalTemplate";
import { useUser } from "@/contexts/UserProvider";
import { createSignal, Show, createEffect, createResource } from "solid-js";
import type { Accessor } from "solid-js";
import { Navigate } from "@solidjs/router";
import type { AxiosResponse } from "axios";
import InputForm from "@/components/Utils/InputForm";

type LoginForm = {
  email: string;
  password: string;
};
const Login = () => {
  const context = useUser();
  const loginUser = context?.loginUser;
  const [password, setPassword] = createSignal("");
  const [user, setUser] = createSignal<LoginForm>();
  const [email, setEmail] = createSignal("");
  const [response] = createResource<Accessor<AxiosResponse>>(user, loginUser);
  return (
    <>
      <ModalTemplate>
        <h1 class="font-light">Log in</h1>
        <InputForm
          value={email}
          setValue={setEmail}
          response={response}
          placeholder={"enter email"}
          errorCondition={() => response() && response().status === 400}
        />
        <InputForm
          value={password}
          setValue={setPassword}
          response={response}
          placeholder={"enter password"}
          errorCondition={() => response() && response().status === 400}
        />
        <button
          class="rounded py-1 pt-2 text-center w-4/6 mt-4  text-white hover:text-gray-300  bg-black mt-2  text-sm border border-gray-300"
          onClick={() => {
            setUser({ password: password(), email: email() });
          }}
        >
          Confirm
        </button>
        <Show when={response()}>
          <Navigate href="/" />
        </Show>
      </ModalTemplate>
    </>
  );
};
export default Login;
