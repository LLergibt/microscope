import { useUser } from "@/contexts/UserProvider";
import { createSignal, Show, createResource } from "solid-js";
import { Navigate } from "@solidjs/router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";

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
  const [response] = createResource(user, loginUser);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Аккаунт</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <TextField class="space-y-1">
            <TextFieldLabel>Login</TextFieldLabel>
            <TextFieldInput onChange={(e) => setEmail(e.currentTarget.value)} />
          </TextField>
          <TextField class="space-y-1">
            <TextFieldLabel>Password</TextFieldLabel>
            <TextFieldInput
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </TextField>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setUser({ password: password(), email: email() });
            }}
          >
            Войти в аккаунт
          </Button>
        </CardFooter>
      </Card>
      <Show when={response()}>
        <Navigate href="/" />
      </Show>
    </>
  );
};
export default Login;
