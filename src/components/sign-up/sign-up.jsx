import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import classes from 'classnames';
import styles from './sign-up.module.scss'
import {registrationFailed, getUser} from "../../redux/actions/registration";
import validate from "./validate";
import openNotification from "../../services/notification";
import * as path from '../../routes/index';

const SignUp = ({setUser, isError, updateError, isLoad}) => {

    const {signUpWrapper, signUpTitle, registerWrapper, registerTitle, registerInput, personalInfoWrapper, personalInfo, personalInfoText, hasAccount,submitWrapper, registerItem, submitButton,
        personalInfoCheck, errorMessage, errorInput} = styles;

    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const currentPassword = watch('registerPassword');

    const history = useHistory();

    const classOfInput = classes(registerInput, {[errorInput] : Object.keys(errors).length !== 0});

    const handlerSubmit = (data) => {
       const {username, registerEmail, registerPassword} = data;
       setUser(username, registerEmail, registerPassword);
    }

    useEffect(() => {
        if (isError === true) {
            openNotification('error', 'Error', 'Request failed.');
            updateError(null);
        }
        if(isError === false) {
            history.push(path.signIn);
            updateError(null);
        }
    },[history, isError, updateError])

    return(
        <form className={signUpWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signUpTitle}>Create new account</span>
            <fieldset className={registerWrapper}>
                <label className={registerItem}>
                    <span className={registerTitle}>Username</span>
                    <input className={classOfInput} type='text' placeholder='username' disabled={isLoad}
                           {...register('username', {...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' disabled={isLoad} {...register('registerEmail', {...validate.validateEmail})}/>
                    {errors.registerEmail && <p className={errorMessage}>{errors.registerEmail.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password'  disabled={isLoad} {...register('registerPassword', {...validate.validatePassword})}/>
                    {errors.registerPassword && <p className={errorMessage}>{errors.registerPassword.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Repeat password</span>
                    <input className={classOfInput} type='password'  placeholder='Repeat password' disabled={isLoad} {...register('registerRepeatPassword', {validate: value => value === currentPassword})}/>
                    {errors.registerRepeatPassword && <p className={errorMessage}>Password does not match.</p>}
                </label>
                <fieldset className={personalInfoWrapper}>
                    <label className={personalInfo}>
                        <input type='checkbox' name='personalInfoAgree' className={personalInfoCheck} disabled={isLoad} {...register('personalInfo', {...validate.validatePersonalInfo})}/>
                        <span className={personalInfoText}>I agree to the processing of my personal information</span>
                    </label>
                    {errors.personalInfo && <p className={errorMessage}>{errors.personalInfo.message}</p>}
                </fieldset>
            </fieldset>
            <fieldset className={submitWrapper}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)} disabled={isLoad}>Create</button>
                <span className={hasAccount}>
                    Already have an account? <Link to={path.signIn}>Sign In.</Link>
                </span>
            </fieldset>
        </form>
    )
}
SignUp.defaultProps = {
    setUser: ()=>{},
    updateError: ()=>{},
    isError: false,
    isLoad: false
}
SignUp.propTypes = {
    setUser: PropTypes.func,
    updateError: PropTypes.func,
    isError: PropTypes.bool,
    isLoad: PropTypes.bool
}
const mapStateToProps = (state) => ({
    isError: state.registrationReducer.registrationFailed,
    isLoad: state.registrationReducer.registrationRequest
})
const mapDispatchToProps = (dispatch) => ({
    setUser: (username, email, password) => dispatch(getUser(username, email, password)),
    updateError: (isError) => dispatch(registrationFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);