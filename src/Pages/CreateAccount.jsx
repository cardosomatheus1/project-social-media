import React from 'react';
import { Link } from 'react-router-dom';
import EditPerfil from '../components/Ed.Perfil.jsx'
import HeaderLogin from '../components/HeaderLogin.jsx'

export default class CreateAccountComponent extends React.Component {
    render(){
        return (
            <>
            <HeaderLogin />
            <EditPerfil />
            </>

        )
    }
}
