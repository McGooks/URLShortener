import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Redirect from "./components/pages/Redirect";
import Navbar from "./components/layouts/Navbar";
import URLState from "./context/url/UrlState";

const App = () => {
  return (
    <URLState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={Redirect} />
          </Switch>
        </Fragment>
      </Router>
    </URLState>
  );
};

export default App;
