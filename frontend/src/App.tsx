import { createSignal } from 'solid-js'
import Translater from './components/Translater'
import Login from './components/Login'
import Navbar from './components/Layout/Navbar'
import UserProvider from './contexts/UserProvider'
import { Router, Route, Routes } from "@solidjs/router";
import { A } from "@solidjs/router"; 


function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
   <Router>
    <UserProvider>
      <Routes>
      <Route path="/" component={Navbar}>
            <Route path="" component={Translater}/>
            <Route path="/login" component={Login}/>
      </Route>
      </Routes>
      </UserProvider>
   </Router>
    </>
  )
}

export default App
