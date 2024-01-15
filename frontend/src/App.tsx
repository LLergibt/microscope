import Room from "./pages/Room";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Layout/Navbar";
import UserProvider from "./contexts/UserProvider";
import RoomProvider from "./contexts/RoomProvider";
import { Router, Route, Routes } from "@solidjs/router";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" component={Navbar}>
              <Route path="/:roomUid" component={Room} />
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
