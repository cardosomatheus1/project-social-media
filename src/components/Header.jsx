import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
     const {user} =this.props
    return (
      <header className="header">
        <div>
          <h1>NextConnect</h1>
        </div>
        <div>
          <Link to={`/profile/${user}`}>Profile</Link>
          <button type="button">SING OUT</button>
        </div>
      </header>
    );
  }
}

export default Header;
