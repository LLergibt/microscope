import { A, Outlet } from "@solidjs/router"; 
import {useUser} from '../../contexts/UserProvider'
import AuthenticatedNavbar from './AuthenticatedNavbar'
const Navbar = () => {
    console.log('ji')
    const {isAuthenticated} = useUser()
    console.log(isAuthenticated())
    return (
    <>
    <div class=" h-24 w-screen  bg-gray-200">
        {isAuthenticated()? <AuthenticatedNavbar/> :<A href="/login">
        login
        </A>}
        <Outlet/>
    </div>
      </>
        )
  }
export default Navbar
