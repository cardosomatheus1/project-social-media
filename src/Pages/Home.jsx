import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import propTypes from "prop-types";
import NameImg from "../components/NameImg";

export default class Home extends React.Component {
  state = {
    info: [],
    textarea: '',
    imageOn: false,
    postImage: '',
    posted:[],
  };

  componentDidMount() {
    this.getLocalStorage();
    this.getPostLocalStorage()
  }

  getLocalStorage = () => {
    const {
      location: {
        state: { userName },
      },
      func,
    } = this.props;
    const {
      location: {
        state: { user },
      },
    } = this.props;
    if (userName) {
      func(userName);
      const userNameStrg = JSON.parse(localStorage.getItem(userName));
      this.setState({ info: userNameStrg });
    } else {
      func(user);
      const userNameStrg = JSON.parse(localStorage.getItem(user));
      this.setState({ info: userNameStrg });
    }
  };

  getPostLocalStorage = () => {
    if(localStorage.getItem("posted")){
      const getPosted = JSON.parse(localStorage.getItem("posted"))
      this.setState({ posted: getPosted })
  }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  postImage = () => {
    const {imageOn} = this.state;
    this.setState({imageOn: !imageOn})
  }

  getPost = () => {
    const {textarea,postImage,info:{userName,foto},posted} = this.state;
    const objPost = {textarea, postImage,userName,foto};
    if(!posted){
    localStorage.setItem("posted", JSON.stringify(objPost))
    this.setState({posted: [objPost], textarea:''});
    }else{
      const refreshPost = [objPost,...posted]
      localStorage.setItem("posted", JSON.stringify(refreshPost));
    this.setState({posted: refreshPost, textarea:''});
    }

  }

  render() {
    const { newUser } = this.props;
    const { info, textarea,imageOn,postImage,posted } = this.state;
    return (
      <div className="homePage">
        <Header user={newUser} />
        <div className="post">
          <NameImg info={info} />
          <form>
            <fieldset>
              <legend>Add a status</legend>
              <textarea
                value={textarea}
                name="textarea"
                id="textarea"
                cols="50"
                rows="3"
                onChange={this.handleChange}
              ></textarea>
            </fieldset>
            <button type="button" onClick={this.postImage}>img</button>
            {imageOn && <input type="text" value={postImage} name="postImage" onChange={this.handleChange}></input>}
          </form>
          <div className="buttonPost">
            <button onClick={this.getPost}>Post</button>
          </div>
        </div>
        <div className="container-posted">
          {posted && posted.map((post, index) => (
            <div className="posted" key={`${post.textarea} ${index}`}>
            <NameImg info={post} />
            <p>{post.textarea}</p>
            {post.postImage && <img className="image-post" src={post.postImage} alt={post.area}/>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  location: propTypes.shape({
    state: propTypes.shape({
      cartProducts1: propTypes.oneOfType([propTypes.array]),
    }),
  }),
}.isRequired;
