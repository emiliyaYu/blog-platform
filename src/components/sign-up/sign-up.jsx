import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import classes from 'classnames';
import styles from './sign-up.module.scss'
import {getUser, registrationStatus} from "../../redux/actions/registration";
import validate from "./validate";
import openNotification from "../../services/notification/notification";
import * as path from '../../routes/index';
import {successStatus, errorStatus} from "../../constants/status";
import checkboxDisabledStatus from "../../utilts/checkboxDisabledStatus";

const SignUp = ({setUser, statusOfSignUp, updateStatus}) => {


    const isDisabled = checkboxDisabledStatus(statusOfSignUp);

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
        if (statusOfSignUp === errorStatus) {
            openNotification('error', 'Error', 'Request failed.');
            updateStatus(null);
        }
        if(statusOfSignUp === successStatus) {
            history.push(path.signIn);
            updateStatus(null);
        }
    },[history, statusOfSignUp, updateStatus])

    return(
        <form className={signUpWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signUpTitle}>Create new account</span>
            <fieldset className={registerWrapper}>
                <label className={registerItem}>
                    <span className={registerTitle}>Username</span>
                    <input className={classOfInput} type='text' placeholder='username' disabled={isDisabled}
                           {...register('username', {...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' disabled={isDisabled} {...register('registerEmail', {...validate.validateEmail})}/>
                    {errors.registerEmail && <p className={errorMessage}>{errors.registerEmail.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password'  disabled={isDisabled} {...register('registerPassword', {...validate.validatePassword})}/>
                    {errors.registerPassword && <p className={errorMessage}>{errors.registerPassword.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Repeat password</span>
                    <input className={classOfInput} type='password'  placeholder='Repeat password' disabled={isDisabled} {...register('registerRepeatPassword', {validate: value => value === currentPassword})}/>
                    {errors.registerRepeatPassword && <p className={errorMessage}>Password does not match.</p>}
                </label>
                <fieldset className={personalInfoWrapper}>
                    <label className={personalInfo}>
                        <input type='checkbox' name='personalInfoAgree' className={personalInfoCheck} disabled={isDisabled} {...register('personalInfo', {...validate.validatePersonalInfo})}/>
                        <span className={personalInfoText}>I agree to the processing of my personal information</span>
                    </label>
                    {errors.personalInfo && <p className={errorMessage}>{errors.personalInfo.message}</p>}
                </fieldset>
            </fieldset>
            <fieldset className={submitWrapper}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)} disabled={isDisabled}>Create</button>
                <span className={hasAccount}>
                    Already have an account? <Link to={path.signIn}>Sign In.</Link>
                </span>
            </fieldset>
        </form>
    )
}

SignUp.propTypes = {
    setUser: PropTypes.func,
    updateStatus: PropTypes.func,
    statusOfSignUp: PropTypes.string
}
SignUp.defaultProps = {
    setUser: () => {},
    updateStatus: () => {},
    statusOfSignUp: 'loading'
}
const mapStateToProps = (state) => ({
    statusOfSignUp: state.registrationReducer.registrationStatus,
})
const mapDispatchToProps = (dispatch) => ({
    setUser: (username, email, password) => dispatch(getUser(username, email, password)),
    updateStatus: (status) => dispatch(registrationStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);