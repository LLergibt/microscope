import type { Component } from "solid-js";
import { A } from "@solidjs/router";

const Index: Component = () => {
  return (
    <>
      <p class="font-medium">Доступные комнаты:</p>
      <A class="underline	hover:text-gray-700" href="rooms/Kk4XJTuv4HiwR5XM1Spe">
        Комната
      </A>
    </>
  );
};

export default Index;
