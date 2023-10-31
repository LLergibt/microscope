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
      class="w-auto h-auto absolute bg-teal-200"
    >
      {props.children}
    </div>
  );
};
export default MenuDropdown;
