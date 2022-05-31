import React from "react";


export default class NameImg extends React.Component {
    render() {
        const {info} =this.props;
        return(
            <div className="nameImg">
            <img src={info.foto} alt={info.name}/> 
            <p>{info.userName}</p>
            </div>
        )
    }
}