import {useUser} from '../contexts/UserProvider'
import AuthForm from './AuthForm'
import { A } from "@solidjs/router"; 
import {createResource} from "solid-js"
import axios from 'axios';

const Login = () => {
  const value = useUser()
  return (
    <>
    <A href="/">
        home
    </A>
    <div className="relative w-full  max-w-md my-56 mx-auto ">
    <div className="relative bg-white shadow-2xl border rounded-lg border-gray-300 dark:bg-gray-700">
      <div className="flex flex-col items-start justify-between p-4 ml-24  mt-2 dark:border-gray-600">
        <h1 className="font-light">
          Log in
        </h1>
        <AuthForm onSubmitFunc={value}/>

        

    </div>
    </div>
    </div>
    </>
  )

}
export default Login
