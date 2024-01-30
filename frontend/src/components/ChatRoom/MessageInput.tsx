import { useUser } from "@/contexts/UserProvider";
import { createSignal } from "solid-js";
import { useFirestore } from "@/services/firebase";
import { TextField, TextFieldInput } from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";

const MessageInput = ({ roomId }) => {
  const { user } = useUser();
  const [value, setValue] = createSignal("");
  const { sendMessage } = useFirestore();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(roomId, user, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} class="mt-2 pr-5">
      <TextField>
        <TextFieldInput
          onChange={handleChange}
          value={value()}
          placeholder="Отправить сообщение"
        />
      </TextField>
    </form>
  );
};
export default MessageInput;
