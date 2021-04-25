import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import classes from 'classnames';
import PropTypes from 'prop-types';
import styles from './sign-in.module.scss'
import {getLoginUser, getLoginUserFailed} from "../../redux/actions/login";
import validate from "./validate";
import openNotification from "../notification";



const SignIn = ({setLoginUser, isError, updateIsError}) => {
    const {signInWrapper,signInTitle, signInForm,signInItem, signInText, signInInput, signInSubmit, signInButton, hasAccount, errorMessage, errorInput} = styles;

    const classOfInput = classes( signInInput, { [errorInput] : isError === null});

    const history = useHistory();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const handlerSubmit = (data) => {
        const {loginEmail, loginPassword} = data;
        return setLoginUser(loginEmail,loginPassword);
    }

    const initHistory = useCallback(() => {
        if(isError === false) {
            history.push('/');
            updateIsError(null)
        }
        if(isError === true) {
            openNotification('error', 'Error', 'Invalid email or password');
            updateIsError(null)
        }
    }, [history, isError, updateIsError])

    useEffect(() => {
       initHistory()
    },[initHistory])

    return (
        <form  className={signInWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signInTitle}>Sign In</span>
            <div className={signInForm}>
                <label className={signInItem}>
                    <span className={signInText}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' {...register('loginEmail',{...validate.validateLoginEmail})}/>
                    {errors.loginEmail && <p className={errorMessage}>{errors.loginEmail.message}</p>}
                </label>
                <label className={signInItem}>
                    <span className={signInText}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password' {...register('loginPassword', {...validate.validatePassword})}/>
                </label>
            </div>
            <div className={signInSubmit}>
                <button className={signInButton} type='button' onClick={handleSubmit(handlerSubmit)}>Login</button>
                <span className={hasAccount}>Don’t have an account? <a>Sign Up.</a></span>
            </div>
        </form>
    )
}
SignIn.defaultProps = {
    setLoginUser: ()=>{},
    updateIsError: ()=>{},
    isError: false
}
SignIn.propTypes = {
    setLoginUser: PropTypes.func,
    updateIsError: PropTypes.func,
    isError: PropTypes.bool
}
const mapSateToProps = (state) => ({
    isError: state.loginReducer.loginFailed
})
const mapDispatchToProps = (dispatch) => ({
    setLoginUser: (email, password) => dispatch(getLoginUser(email, password)),
    updateIsError : (isError) => dispatch(getLoginUserFailed(isError)),
})
export default connect(mapSateToProps, mapDispatchToProps)(SignIn);