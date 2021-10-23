import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/new">
          <NewTask />
        </Route>
        <Route path="/update/:id">
          <UpdateTask />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
