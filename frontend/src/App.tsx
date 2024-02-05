import Room from "./pages/Room";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import Layout from "./components/Layout/Index";
import UserProvider from "./contexts/UserProvider";
import { Router, Route, Routes } from "@solidjs/router";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" component={Layout}>
              <Route path="/" component={Index} />
              <Route path="/rooms/:roomUid" component={Room} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
