import { createContext, createEffect, onMount, createResource, createSignal, useContext } from "solid-js";
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
        if (token()) {
          const decodedLogin = jwtDecode(token()).login
          setLogin(decodedLogin)
        }
  }
  const isAuthenticated = () => token()? true: false
  const logout = () => {
      if (token()) {
        localStorage.removeItem("jwt-token")
        setLogin()
        setToken()
      }

  }

  createEffect(() => {
    handleToken()
  })
  const loginUser = async (user) => {
      if (user === "") return [];
  
    const responseRaw = await fetch('http://localhost:8000/login/', {
      body: JSON.stringify({
        login: user.login,
        password: user.password
      }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
     const response = await responseRaw.json()
     setToken(response)
     return response
  }
  
  return (
    <UserContext.Provider value={{loginUser, token, login, isAuthenticated, logout}}>
      {props.children}
    </UserContext.Provider>
  )
}
export const useUser = () => useContext(UserContext)
export default UserProvider
