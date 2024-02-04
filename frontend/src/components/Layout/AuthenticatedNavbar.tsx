import { useUser } from "@/contexts/UserProvider";
import type { Component } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { As } from "@kobalte/core";
import { Button } from "@/components/ui/button";

const AuthenticatedNavbar: Component = () => {
  const { login, logout } = useUser();
  return (
    <>
      <DropdownMenu placement="bottom">
        <DropdownMenuTrigger asChild>
          <As component={Button} variant="outline">
            {login()}
          </As>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Мой профиль</DropdownMenuGroupLabel>
            <DropdownMenuSeparator />
            <span
              onClick={logout}
              class="relative flex cursor-default hover:bg-slate-100 hover:rounded select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
            >
              Выйти
            </span>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default AuthenticatedNavbar;
