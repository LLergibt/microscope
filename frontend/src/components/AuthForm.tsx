import {createSignal, createEffect, createResource} from 'solid-js'
import {useUser} from '../contexts/UserProvider'
const AuthForm = (props) => {
  const [login, setLogin] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [user, setUser] = createSignal('')
  const {loginUser} = useUser()
  const [data] = createResource(user, loginUser)
  return (
    <>
        <input placeholder="Enter username" className="rounded py-2 pt-3 w-4/6 text-sm mt-2 mb-1  pl-2 border border-gray-300 focus:outline-none" value={login()} onChange={(e) => {setLogin(e.target.value)}}>
        </input>
        <input placeholder="Enter password" className="rounded py-2  pt-3 w-4/6 text-sm mt-2  pl-2 border border-gray-300 focus:outline-none" value={password()} onChange={(e) => {setPassword(e.target.value)}}>
        </input>
        <button  className="rounded py-1 pt-2 text-center w-4/6 mt-4  text-white bg-violet-700 mt-2  text-sm border border-gray-300" onClick={() => {setUser({login: login(), password: password()})}}>
           Confirm 
        </button>
    </>
  )
}
export default AuthForm
