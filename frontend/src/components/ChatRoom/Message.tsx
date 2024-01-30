const Message = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;
  console.log(message, isOwnMessage);
  return (
    <li
      class={` min-w-[7rem] max-w-[20rem] ${
        isOwnMessage
          ? "bg-black self-end border rounded text-white text-end self-end  pl-2 px-1 flex flex-col mb-2"
          : "border rounded pt-1 px-1 pr-2 mb-2 self-start text-start self-start"
      }`}
    >
      <h4 class="font-medium">{isOwnMessage ? "You" : displayName}</h4>
      <div class="break-words">{text}</div>
    </li>
  );
};
export default Message;
