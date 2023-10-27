import { createContext, createEffect, createResource, createSignal, useContext } from "solid-js";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

const UserContext = createContext()
const UserProvider = (props) => {
  console.log(localStorage.getItem('jwt-token'))
  const [token, setToken] = createSignal(localStorage.getItem('jwt-token'))
  const [login, setLogin] = createSignal('')
  const handleToken = async () => {
        if (token() && localStorage.getItem('jwt-token') !== token()) {
            localStorage.setItem("jwt-token", await token())

        }
        token() && setLogin(jwtDecode(token()).login)
  }
  const isAuthenticated = () => token()? true: false

  createEffect(() => {
    handleToken()
  })
  const loginUser = async (user) => {
      console.log(user, 'gg')
      if (user === "") return [];
  
    const response = await fetch('http://localhost:8000/login/', {
      body: JSON.stringify({
        login: user.login,
        password: user.password
      }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
     setToken(await response.json())
     return response.json()
  }
  
  return (
    <UserContext.Provider value={{loginUser, token, login, isAuthenticated}}>
      {props.children}
    </UserContext.Provider>
  )
}
export const useUser = () => useContext(UserContext)
export default UserProvider
