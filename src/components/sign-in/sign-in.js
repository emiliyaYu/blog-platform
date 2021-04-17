import React from 'react';
import styles from './sign-in.module.scss'

const SignIn = () => {
    const {signInWrapper,signInTitle, signInForm,signInItem, signInText, signInInput, signInSubmit, signInButton, hasAccount} = styles;
    return (
        <div className={signInWrapper}>
            <span className={signInTitle}>Sign In</span>
            <div className={signInForm}>
                <label className={signInItem}>
                    <span className={signInText}>Email</span>
                    <input className={signInInput} type='text' placeholder='Email'/>
                </label>
                <label className={signInItem}>
                    <span className={signInText}>Password</span>
                    <input className={signInInput} type='text' placeholder='Password'/>
                </label>
            </div>
            <div className={signInSubmit}>
                <button className={signInButton} type='button'>Login</button>
                <span className={hasAccount}>Don’t have an account? <a>Sign Up.</a></span>
            </div>
        </div>
    )
}
export default SignIn;