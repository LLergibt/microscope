const Message = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;
  console.log(message, isOwnMessage);
  return (
    <li
      class={`${
        isOwnMessage
          ? "bg-blue-500 self-end border rounded   w-auto  px-1 flex flex-col mb-2"
          : "border rounded pt-1 px-1 mb-2 self-start"
      }`}
    >
      <h4
        class={`${
          isOwnMessage ? "text-end self-end" : "text-start self-start"
        } `}
      >
        {isOwnMessage ? "You" : displayName}
      </h4>
      <div class="pl-2">{text}</div>
    </li>
  );
};
export default Message;
