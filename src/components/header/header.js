import React from "react";
import classes from 'classnames';
import styles from './header.module.scss'

const Header = () => {
    const {header, titleHeader, buttonHeaderWrapper, buttonHeader, SignIn, SignUp} = styles;
    const signInClass = classes(buttonHeader, SignIn);
    const signUpClass = classes(buttonHeader, SignUp);
    return (
        <header className={header}>
            <span className={titleHeader}>Realworld Blog</span>
            <div className={buttonHeaderWrapper}>
                <button type='button' className={signInClass}>Sign In</button>
                <button type='button' className={signUpClass}>Sign Up</button>
            </div>
        </header>
    )
}

export default Header;