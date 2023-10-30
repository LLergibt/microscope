import { createSignal } from "solid-js";
import { useClickOutside } from "../../hooks/useClickOutside";
const MenuDropdown = (props) => {
  const [dropdownRef, setDropdown] = createSignal();
  useClickOutside(dropdownRef, props.onClickOutside);

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
