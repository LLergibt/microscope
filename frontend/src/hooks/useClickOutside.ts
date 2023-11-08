import { onCleanup } from "solid-js";
import type { JSX } from "solid-js";

export function useClickOutside(el: JSX.Element, accessor: () => void) {
  const onClick = (e: Event) => {
    !el().contains(e.target) && accessor();
  };
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
