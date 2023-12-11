import { A } from "@solidjs/router";

const ModalTemplate = (props) => {
  return (
    <>
      <A class="text-gray-600 transition-colors hover:text-black" href="/">
        Home
      </A>
      <div class="relative w-full  max-w-md my-56  h-full mx-auto ">
        <div class="relative bg-white  shadow-2xl border rounded-lg border-gray-300 dark:bg-gray-700">
          <div class="flex flex-col items-start justify-between p-4 ml-24  mt-2 dark:border-gray-600">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalTemplate;
