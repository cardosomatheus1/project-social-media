import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default class Profile extends React.Component {
  state = {
    name: '',
    password: '',
    email: '',
    foto: '',
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { match: { params: { user } }} = this.props
    const userData = localStorage.getItem(user);
    if (userData) {
      const data = JSON.parse(userData);
      this.setState({ 
        name: data.name,
        password: data.password,
        email: data.email,
        foto: data.foto,
       });
    }
    // console.log(this.props);
  }



  render() {
    const { name, password, email, foto } = this.state;
    const { match: { params: { user } }} = this.props

    return (
      <main>
          <Header />
        <h1>Profile</h1>
        <div>
          <p>{name}</p>
          <p>{email}</p>
          <img src={ foto } alt={ name } />
        </div>
        <Link to={{
              pathname: "/home",
              state: { user },
            }}>
            <button type="button">Voltar</button>
        </Link>
      </main>
    );
  }
}
