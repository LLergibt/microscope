import { useUser } from "@/contexts/UserProvider";
import { createSignal, Accessor, JSX } from "solid-js";
import { User } from "firebase/auth";
import { TextField, TextFieldInput } from "@/components/ui/textfield";

const MessageInput = (props: {
  sendMessage: (user: Accessor<User>, text: Accessor<string>) => Promise<void>;
}) => {
  const { user } = useUser();
  const [value, setValue] = createSignal("");

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (
    event
  ) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, Event> = (
    event
  ) => {
    event.preventDefault();
    if (user()) {
      props.sendMessage(user as Accessor<User>, value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} class="mt-2 pr-5">
      <TextField>
        <TextFieldInput
          onInput={handleChange}
          value={value()}
          placeholder="Отправить сообщение"
        />
      </TextField>
    </form>
  );
};
export default MessageInput;
