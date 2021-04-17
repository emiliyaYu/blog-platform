import React from "react";
import {Link} from 'react-router-dom'
import classes from 'classnames';
import styles from './header.module.scss'


const Header = () => {
    const {header, titleHeader, buttonHeaderWrapper, buttonHeader, SignIn, SignUp} = styles;
    const signInClass = classes(buttonHeader, SignIn);
    const signUpClass = classes(buttonHeader, SignUp);
    return (
        <header className={header}>
            <Link to='/home'><span className={titleHeader}>Realworld Blog</span></Link>
            <div className={buttonHeaderWrapper}>
                <Link to='/sign_in'><button type='button' className={signInClass}>Sign In</button></Link>
                <Link to='/sign_up'><button type='button' className={signUpClass}>Sign Up</button></Link>
            </div>
        </header>
    )
}

export default Header;