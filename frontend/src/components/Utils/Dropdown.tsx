import {createSignal, createEffect, Show, onMount} from 'solid-js'
import MenuDropdown from './MenuDropdown'
const Dropdown = (props) => {

    const [isClicked, setIsClicked] = createSignal(false)
    console.log(props.buttonValue)

    return (
    <>
      <button class="font-light border border-black bg-gray-100 px-3 max-w-xs text-center shadow-md" onClick={(e) => {setIsClicked(true)}}>
      {props.buttonValue()}
      </button>
      <Show when={isClicked()}>
        <MenuDropdown onClickOutside={() => setIsClicked(false)}>
          {props.children}
        </MenuDropdown>
      </Show>
      </>
    )
}
export default Dropdown
