import React from 'react';
import styles from './sign-up.module.scss'

const SignUp = () => {
    const {signUpWrapper, signUpTitle, registerWrapper, registerTitle, registerInput, personalInfoWrapper, personalInfo, personalInfoText, hasAccount,submitWrapper, registerItem, submitButton,
        personalInfoCheck} = styles
    return(
        <div className={signUpWrapper}>
            <span className={signUpTitle}>Create new account</span>
            <div className={registerWrapper}>
                <label className={registerItem}>
                    <span className={registerTitle}>Username</span>
                    <input className={registerInput} type='text' name='registerUsername' placeholder='Username'/>
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Email</span>
                    <input className={registerInput} type='text' name='registerEmail' placeholder='Email'/>
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Password</span>
                    <input className={registerInput} type='text' name='registerPassword' placeholder='Password'/>
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Repeat password</span>
                    <input className={registerInput} type='text' name='registerRepeatPassword' placeholder='Repeat password'/>
                </label>
                <div className={personalInfoWrapper}>
                    <label className={personalInfo}>
                        <input type='checkbox' name='personalInfoAgree' className={personalInfoCheck}/>
                        <span className={personalInfoText}>I agree to the processing of my personal information</span>
                    </label>
                </div>
            </div>
            <div className={submitWrapper}>
                <button type='button' className={submitButton}>Create</button>
                <span className={hasAccount}>
                    Already have an account? <a>Sign In.</a>
                </span>
            </div>
        </div>
    )
}
export default SignUp;