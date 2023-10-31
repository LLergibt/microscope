import type { Accessor } from "solid-js";

export type userType = {
  login: string;
  password: string;
};
export type userContextType = {
  loginUser: (user: userType) => Promise<string>;
  token: Accessor<string>;
  login: Accessor<string>;
  logout: () => void;
};
