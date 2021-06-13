import Profile from "./Profile";
import Message from "./Message";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import LoginRegister from "./Loginregister";
import Contact from "./Contact";
import CreateStory from "./CreateStory";
import MyStories from "./MyStories";
import DeleteUser from "./Deteleuser";
import Changepassword from "./ChangePassword";
import RandomStories from "./RandomStories";

function App() {
  return (
    <div className="App">
      <Menu />
      <main>
        <Switch>
          <Route path="/Home" exact>
            <Home />
          </Route>
          <Route path="/Mystories" exact>
            <MyStories />
          </Route>
          <Route path="/Message" exact>
            <Message />
          </Route>
          <Route path="/Loginregister" exact>
            <LoginRegister />
          </Route>
          <Route path="/Profile" exact>
            <Profile />
          </Route>
          <Route path="/Contact" exact>
            <Contact />
          </Route>
          <Route path="/Createstory" exact>
            <CreateStory />
          </Route>
          <Route path="/Deleteuser" exact>
            <DeleteUser />
          </Route>
          <Route path="/changepassword" exact>
            <Changepassword />
          </Route>
          <Route path="/createstory" exact>
            <CreateStory />
          </Route>
          <Route path="/randomstories" exact>
            <RandomStories />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
