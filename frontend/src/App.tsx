import Translater from "./components/Translater";
import Login from "./components/Login";
import Navbar from "./components/Layout/Navbar";
import UserProvider from "./contexts/UserProvider";
import { Router, Route, Routes } from "@solidjs/router";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" component={Navbar}>
              <Route path="" component={Translater} />
              <Route path="/login" component={Login} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
