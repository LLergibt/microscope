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
        class="font-light border border-black bg-gray-100 px-3 max-w-xs text-center shadow-md"
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
