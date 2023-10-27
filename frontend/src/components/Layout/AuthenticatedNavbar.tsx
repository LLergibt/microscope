import {useUser} from '../../contexts/UserProvider'
import {createSignal, createEffect} from 'solid-js'

const AuthenticatedNavbar = () => {
    const {login} = useUser()
    const [isClicked, setIsClicked] = createSignal(false)
    console.log(login())
    createEffect(() => {
        console.log(isClicked())
    })
    return (
    <>
      <button class="font-light border border-black bg-gray-100 px-3 max-w-xs text-center shadow-md" onClick={() => {setIsClicked((prev) => !prev)}}>
      {login()}
      </button>
      </>
        
    )

}
export default AuthenticatedNavbar
