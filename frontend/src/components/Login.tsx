import AuthForm from "./AuthForm";
import { A } from "@solidjs/router";

const Login = () => {
  return (
    <>
      <A href="/">home</A>
      <div class="relative w-full  max-w-md my-56 mx-auto ">
        <div class="relative bg-white shadow-2xl border rounded-lg border-gray-300 dark:bg-gray-700">
          <div class="flex flex-col items-start justify-between p-4 ml-24  mt-2 dark:border-gray-600">
            <h1 class="font-light">Log in</h1>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
