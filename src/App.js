import "./App.scss";
import { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  const [search, setSearch] = useState("");
  const [searchValidated, setSearchValidated] = useState(false);

  return (
    <Router>
      <Header
        setSearch={setSearch}
        setSearchValidated={setSearchValidated}
        search={search}
      />
      <Switch>
        <Route exact path="/">
          <Home
            search={search}
            searchValidated={searchValidated}
            setSearchValidated={setSearchValidated}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
