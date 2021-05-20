import React from 'react';
import Accounts from './components/Accounts';
import Account from './components/Account';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Accounts} />
        <Route path="/account" component={Account} />
      </Switch>
    </Router>
  );
}

export default App;
