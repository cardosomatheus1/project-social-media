import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const INICIAR_STATE = {
  userName: '',
  name: '',
  password: '',
  email: '',
  foto: '',
  userNameStorage: '',
  redirect: false
};

class EditPerfil extends React.Component {
  constructor() {
    super();
    this.state = INICIAR_STATE;

    this.onHandleChange = this.onHandleChange.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  componentDidMount() {
    this.setState({redirect: false})
    const { userName } = this.props;
    const info = JSON.parse(localStorage.getItem(userName));
    if (info) {
      this.setState({...info });
    }
  }

  getLocalStorage = () => {
    const { userName} = this.state
    if(localStorage.getItem(userName)){
        const userNameStrg = JSON.parse(localStorage.getItem(userName))
        this.setState({ userNameStorage: userNameStrg.userName })
    }
}  

  onHandleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.getLocalStorage());
  }

  salvar() {
    const { userName, name, password, email, foto, userNameStorage } = this.state;
    if (userNameStorage === userName){
      alert("Já existe um usuario com esse nome")
    }
    else{
    this.setState({info:{userName,name,email,password,foto}},() => {
      localStorage.setItem(userName, JSON.stringify(this.state)) 
      this.setState({redirect: true})
    });
    }
  }

  render() {
    const { name, password, email, foto, userName,redirect } = this.state;
    return (
      <div>
        <h1>Criar Conta</h1>
      <form className="loginForm">
          <label htmlFor="userName">
            Usuario:
          <input
            type="text"
            onChange={ this.onHandleChange }
            value={ userName }
            name="userName"
            id="userName"
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            onChange={ this.onHandleChange }
            value={ name }
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            onChange={ this.onHandleChange }
            value={ password }
            name="password"
            id="password"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            onChange={ this.onHandleChange }
            value={ email }
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="foto">
          Foto:
          <input
            type="text"
            onChange={ this.onHandleChange }
            value={ foto }
            name="foto"
            id="foto"
          />
        </label>
        <div>
        <button type="button" onClick={ this.salvar }>Salvar</button>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
        </div>
      </form>
      {redirect && <Redirect to={{
                    pathname: '/home',
                    state: {userName}}} />
                }
      </div>
    );
  }
}

export default EditPerfil;
