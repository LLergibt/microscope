import { useUser } from "@contexts/UserProvider";
import { createSignal } from "solid-js";
import { useFirestore } from "@services/firebase";

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
    <form onSubmit={handleSubmit} class="my-2 flex">
      <input
        type="text"
        placeholder="Enter a message"
        value={value()}
        onChange={handleChange}
        required
        class="bg-gray-300 rounded"
        minLength={1}
      />
      <button
        class="rounded text-center  text-white hover:text-gray-300  bg-black ml-2 p-2 text-sm border border-gray-300"
        type="submit"
        disabled={value < 1}
      >
        Send
      </button>
    </form>
  );
};
export default MessageInput;
