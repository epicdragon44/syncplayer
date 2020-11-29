import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import "./nav.css"

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                <NavigationNonAuth />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <center>
        <ul className="navbar">
            <li className="navbar">
                <Link to={ROUTES.HOME}>
                    <img className="navbar" src={require('./img/icon1.png')} alt=""/>
                </Link>
            </li>
            <li className="navbar">
                <Link to={ROUTES.INSTRUCTIONS}>
                    <img className="navbar" src={require('./img/icon2.png')} alt=""/>
                </Link>
            </li>
            <li className="navbar">
                <Link to={ROUTES.LANDING}>
                    <img className="navbar" src={require('./img/icon3.png')} alt=""/>
                </Link>
            </li>
            <li className="navbar">
                <Link to={ROUTES.ACCOUNT}>
                    <img className="navbar" src={require('./img/icon4.png')} alt=""/>
                </Link>
            </li>

        </ul>
    </center>
);

function NavigationNonAuth() {
    let home = window.location.href.substring(0, (window.location.href.lastIndexOf("/")));
    return (
        <center>
            <ul className="navbar">
                <li class="logo"><a id="logo" href={home}>SyncPlayer</a></li>
            </ul>
        </center>
    );    
}

export default Navigation;