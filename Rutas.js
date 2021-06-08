<NavLink to="/home" activeClassName="active" exact>
Home
</NavLink>
<NavLink to="/search" activeClassName="active" exact>
Search
</NavLink>
<NavLink to="/registrologin" activeClassName="active" exact>
Registrologin
</NavLink>
<NavLink to="/contact" activeClassName="active" exact>
Contact
</NavLink>
<NavLink to="/profile" activeClassName="active" exact>
Profile
</NavLink>
<NavLink to="/createstory" activeClassName="active" exact>
Createstory
</NavLink>
<NavLink to="/story" activeClassName="active" exact>
Story
</NavLink>
<NavLink to="/Member" activeClassName="active" exact>
Member
</NavLink>
<NavLink to="/mystories" activeClassName="active" exact>
Mystories
</NavLink>



//import "./App.css";

/*/function App() {
//  return (
//    <div className="App">
//      <main>
 //       <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/registrologin" exact>
            <Registrologin />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/createstory">
            <Createstory />
          </Route>
          <Route path="story" exact>
            <Story />
          </Route>
          <Route path="/user" exact>
            <User />
          </Route>
          <Route path="/mystories" exact>
            <Mystories />
            <Route />
          </Route>
          <Route path="/">Not Found</Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
