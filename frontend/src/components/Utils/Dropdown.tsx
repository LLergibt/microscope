import { createSignal, Show } from "solid-js";
import MenuDropdown from "./MenuDropdown";
import type { JSX, Component, Accessor } from "solid-js";

const Dropdown: Component<{
  children: JSX.Element;
  buttonValue: Accessor<string>;
}> = (props) => {
  const [isClicked, setIsClicked] = createSignal(false);

  return (
    <>
      <button
        class=" border border-gray-300 m-1 hover:bg-gray-100 shadow-sm rounded-sm text-left px-3  max-w-xs shadow-md"
        onClick={() => {
          setIsClicked(true);
        }}
      >
        {props.buttonValue()}
      </button>
      <Show when={isClicked()}>
        <MenuDropdown onClickOutside={() => setIsClicked(false)}>
          {props.children}
        </MenuDropdown>
      </Show>
    </>
  );
};
export default Dropdown;
