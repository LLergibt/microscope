import { createEffect } from 'solid-js';
//import {RefreshContext} from 'components/layout'
//
import { onCleanup } from "solid-js";

export function useClickOutside(el, accessor) {
  const onClick = (e) => {
    !el().contains(e.target) && accessor();}
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}


