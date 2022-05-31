import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CreateAccount from './Pages/CreateAccount';

class App extends React.Component {
  state = {
    newUser: ''
  };

  changerUser = (userName) => { 
    this.setState({newUser: userName});
  }

  render(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/createaccount" component={ CreateAccount } />
        <Route
              path="/home"
              render={ (props) => (<Home
                { ...props }
                func={this.changerUser}
                newUser={this.state.newUser}
              />
              ) }
              />
        <Route path="/profile/:user" component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;
