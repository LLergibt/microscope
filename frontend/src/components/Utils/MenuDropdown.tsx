import { createSignal, createEffect } from "solid-js";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { JSX, Component } from "solid-js";
const MenuDropdown: Component<{
  children: JSX.Element;
  onClickOutside: () => false;
}> = (props) => {
  const [dropdownRef, setDropdown] = createSignal();
  createEffect(() => {
    useClickOutside(dropdownRef, props.onClickOutside);
  });

  return (
    <div
      ref={(el) => setDropdown(el)}
      class="w-auto border  rounded h-auto h-32 w-32 absolute my-1 ml-1 pl-1 shadow bg-white "
    >
      {props.children}
    </div>
  );
};
export default MenuDropdown;
