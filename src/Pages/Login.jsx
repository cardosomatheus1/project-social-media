import React from "react";
import { Link, Redirect } from "react-router-dom";
import HeaderLogin from "../components/HeaderLogin";

export default class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    userNameStorage: "",
    passwordStorage: "",
    redirect: false,
  };

  componentDidMount() {
    this.setState({ redirect: false });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.getLocalStorage());
  };

  getLocalStorage = () => {
    const { userName } = this.state;
    if (localStorage.getItem(userName)) {
      const userNameStrg = JSON.parse(localStorage.getItem(userName));
      this.setState({
        userNameStorage: userNameStrg.userName,
        passwordStorage: userNameStrg.password,
      });
    }
  };

  compareLogin = () => {
    const { userName, password, userNameStorage, passwordStorage } = this.state;
    if (!userNameStorage) {
      alert("Usuario não existe");
    } else if (userName === userNameStorage && password === passwordStorage) {
      this.setState({ redirect: true });
    } else {
      alert("Senha invalida");
    }
  };

  render() {
    const { userName, password, redirect } = this.state;
    return (
      <div>
       <HeaderLogin />
        <h1>Login</h1>
        <form className="loginForm">
          <label htmlFor="user-name">
            Usuario:
            <input
              type="text"
              onChange={this.handleChange}
              name="userName"
              id="user-name"
              value={userName}
            ></input>
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              onChange={this.handleChange}
              name="password"
              id="password"
              value={password}
            ></input>
          </label>
          <div>
            <button onClick={this.compareLogin} type="button">
              Entrar
            </button>
            <Link to="createaccount">
              <button type="button">Criar conta</button>
            </Link>
          </div>
        </form>
        {redirect && (
          <Redirect
            to={{
              pathname: "/home",
              state: { userName },
            }}
          />
        )}
      </div>
    );
  }
}
