import { Show, Component } from "solid-js";
import type { Accessor, Setter } from "solid-js";
import type { AxiosResponse } from "axios";
type InputParameters = {
  errorCondition: () => boolean;
  value: Accessor<string>;
  setValue: Setter<string>;
  response: Accessor<AxiosResponse>;
};
const InputForm: Component<InputParameters> = (props) => {
  return (
    <>
      <input
        placeholder="Enter username"
        class={`rounded py-2 pt-3 w-4/6 text-sm mt-2 mb-1  pl-2 border border-gray-300 focus:outline-none ${
          props.errorCondition() && "border-red-400"
        }`}
        value={props.value()}
        onInput={(e) => {
          props.setValue(e.target.value);
        }}
      />
      <Show when={props.errorCondition()}>
        <p class="text-red-700 text-sm">{props.response().data.detail}</p>
      </Show>
    </>
  );
};
export default InputForm;
