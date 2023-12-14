const Message = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;
  console.log(message, isOwnMessage);
  return (
    <li
      class={`${
        isOwnMessage
          ? "bg-blue-500 border rounded py-2  px-8   mb-2"
          : "border rounded py-2 px-8 mb-2"
      }`}
    >
      <h4>{isOwnMessage ? "You" : displayName}</h4>
      <div>{text}</div>
    </li>
  );
};
export default Message;
