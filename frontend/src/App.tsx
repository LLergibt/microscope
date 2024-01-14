import Translater from "./pages/Translater";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
              <Route path="/:roomUid" component={Translater} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
