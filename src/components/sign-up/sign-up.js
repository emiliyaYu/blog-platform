import React from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classes from 'classnames';
import styles from './sign-up.module.scss'
import {getUser, registrationFailed} from "../../redux/actions/registration";
import validate from "./validate";
import openNotification from "../notification";

const SignUp = ({setUser, isError, updateError}) => {
    const {signUpWrapper, signUpTitle, registerWrapper, registerTitle, registerInput, personalInfoWrapper, personalInfo, personalInfoText, hasAccount,submitWrapper, registerItem, submitButton,
        personalInfoCheck, errorMessage, errorInput} = styles;

    const classOfInput = classes(registerInput, {[errorInput] : isError === null})

    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const currentPassword = watch('registerPassword');

    const handlerSubmit = (data) => {
       const {username, registerEmail, registerPassword} = data;
       if (isError === true) {
           openNotification('error', 'Error', 'Request failed');
           updateError(null);
       }

        return setUser(username, registerEmail, registerPassword);
    }

    return(
        <form className={signUpWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signUpTitle}>Create new account</span>
            <fieldset className={registerWrapper}>
                <label className={registerItem}>
                    <span className={registerTitle}>username</span>
                    <input className={classOfInput} type='text' placeholder='username'
                           {...register('username', {...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' {...register('registerEmail', {...validate.validateEmail})}/>
                    {errors.registerEmail && <p className={errorMessage}>{errors.registerEmail.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password'  {...register('registerPassword', {...validate.validatePassword})}/>
                    {errors.registerPassword && <p className={errorMessage}>{errors.registerPassword.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Repeat password</span>
                    <input className={classOfInput} type='password'  placeholder='Repeat password' {...register('registerRepeatPassword', {validate: value => value === currentPassword})}/>
                    {errors.registerRepeatPassword && <p className={errorMessage}>Password does not match.</p>}
                </label>
                <fieldset className={personalInfoWrapper}>
                    <label className={personalInfo}>
                        <input type='checkbox' name='personalInfoAgree' className={personalInfoCheck} {...register('personalInfo', {...validate.validatePersonalInfo})}/>
                        <span className={personalInfoText}>I agree to the processing of my personal information</span>
                    </label>
                    {errors.personalInfo && <p className={errorMessage}>{errors.personalInfo.message}</p>}
                </fieldset>
            </fieldset>
            <fieldset className={submitWrapper}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)}>Create</button>
                <span className={hasAccount}>
                    Already have an account? <a>Sign In.</a>
                </span>
            </fieldset>
        </form>
    )
}
SignUp.defaultProps = {
    setUser: ()=>{},
    updateError: ()=>{},
    isError: false,
}
SignUp.propTypes = {
    setUser: PropTypes.func,
    updateError: PropTypes.func,
    isError: PropTypes.bool,
}
const mapStateToProps = (state) => ({
    isError: state.registrationReducer.registrationFailed
})
const mapDispatchToProps = (dispatch) => ({
    setUser: (username, email, password) => dispatch(getUser(username, email, password)),
    updateError: (isError) => dispatch(registrationFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);