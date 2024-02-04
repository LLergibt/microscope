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

type SignupForm = {
  email: string;
  password: string;
  login: string;
};
const Signup = () => {
  const context = useUser();
  const createUser = context?.createUser;
  const [password, setPassword] = createSignal("");
  const [login, setLogin] = createSignal("");
  const [user, setUser] = createSignal<SignupForm | null>(null);
  const [email, setEmail] = createSignal("");
  const [response] = createResource(user, createUser);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Аккаунт</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <TextField class="space-y-1">
            <TextFieldLabel>Email</TextFieldLabel>
            <TextFieldInput onChange={(e) => setEmail(e.currentTarget.value)} />
            <TextField class="space-y-1">
              <TextFieldLabel>Login</TextFieldLabel>
              <TextFieldInput
                onChange={(e) => setLogin(e.currentTarget.value)}
              />
            </TextField>
            <TextField class="space-y-1">
              <TextFieldLabel>Password</TextFieldLabel>
              <TextFieldInput
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </TextField>
          </TextField>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setUser({
                email: email(),
                password: password(),
                login: login(),
              });
            }}
          >
            Создать аккаунт
          </Button>
        </CardFooter>
      </Card>
      <Show when={response()}>
        <Navigate href="/" />
      </Show>
    </>
  );
};
export default Signup;
