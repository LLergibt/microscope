import {useUser} from '../../contexts/UserProvider'
import {createSignal } from 'solid-js'
import Dropdown from '../Utils/Dropdown'

const AuthenticatedNavbar = () => {
    const {login, logout} = useUser()
    console.log(login())
    return (
    <>
    <Dropdown buttonValue={login}>
    <button onClick={logout}>
      logout
    </button>
    </Dropdown>
      </>
        
    )

}
export default AuthenticatedNavbar
