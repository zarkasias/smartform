import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import FormList from './FormList';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import EnterForm from './EnterForm';

class App extends Component {
  render() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FormList} />
        <Route path="/create" component={CreateForm} />
        <Route path="/edit/:formid" component={EditForm} />
        <Route path="/enterdata/:formid" component={EnterForm} />
      </Switch>
    </div>   
  );
}
}

export default App;
