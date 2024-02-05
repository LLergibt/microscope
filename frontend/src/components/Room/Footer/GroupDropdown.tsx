import { Button } from "@/components/ui/button";
import { Component } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { As } from "@kobalte/core";
const GroupDropdown: Component = () => {
  return (
    <>
      <DropdownMenu placement="top">
        <DropdownMenuTrigger asChild>
          <As component={Button} variant="outline">
            <img src="/group_add.svg" />
          </As>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>label</DropdownMenuGroupLabel>
            <DropdownMenuSeparator />
            <span class="relative flex cursor-default hover:bg-slate-100 hover:rounded select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
              content
            </span>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default GroupDropdown;
