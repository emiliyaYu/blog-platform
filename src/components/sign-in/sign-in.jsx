import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import classes from 'classnames';
import PropTypes from 'prop-types';
import styles from './sign-in.module.scss'
import {getLoginUser, getLoginUserFailed} from "../../redux/actions/login";
import validate from "./validate";
import openNotification from "../../services/notification/notification";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';



const SignIn = ({setLoginUser, isError, updateIsError, page, renewArticlesList, isLoad}) => {
    const {signInWrapper,signInTitle, signInForm,signInItem, signInText, signInInput, signInSubmit, signInButton, hasAccount, errorMessage, errorInput} = styles;



    const history = useHistory();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const classOfInput = classes( signInInput, { [errorInput] : Object.keys(errors).length !== 0});

    const handlerSubmit = (data) => {
        const {loginEmail, loginPassword} = data;
        return setLoginUser(loginEmail, loginPassword);
    }

    const initHistory = useCallback(() => {
        if(isError === false) {
            renewArticlesList(5, page)
            history.push('/');
            updateIsError(null)
        }
        if(isError === true) {
            openNotification('error', 'Error', 'Invalid email or password');
            updateIsError(null)
        }
    }, [history, isError, page, renewArticlesList, updateIsError])

    useEffect(() => {
       initHistory()
    },[initHistory])

    return (
        <form  className={signInWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signInTitle}>Sign In</span>
            <div className={signInForm}>
                <label className={signInItem}>
                    <span className={signInText}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' disabled={isLoad} {...register('loginEmail',{...validate.validateLoginEmail})}/>
                    {errors.loginEmail && <p className={errorMessage}>{errors.loginEmail.message}</p>}
                </label>
                <label className={signInItem}>
                    <span className={signInText}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password' disabled={isLoad} {...register('loginPassword', {...validate.validatePassword})}/>
                    {errors.loginPassword && <p className={errorMessage}>{errors.loginPassword.message}</p>}
                </label>
            </div>
            <div className={signInSubmit}>
                <button className={signInButton} type='button' onClick={handleSubmit(handlerSubmit)} disabled={isLoad}>Login</button>
                <span className={hasAccount}>Don’t have an account? <Link to={path.signUp}>Sign Up.</Link></span>
            </div>
        </form>
    )
}
SignIn.defaultProps = {
    setLoginUser: ()=>{},
    updateIsError: ()=>{},
    renewArticlesList:()=>{},
    isError: false,
    page: 1,
    isLoad: false
}
SignIn.propTypes = {
    setLoginUser: PropTypes.func,
    updateIsError: PropTypes.func,
    renewArticlesList: PropTypes.func,
    isError: PropTypes.bool,
    page: PropTypes.number,
    isLoad: PropTypes.bool
}
const mapSateToProps = (state) => ({
    isError: state.loginReducer.loginFailed,
    page: state.articlesReducer.currentPage,
    isLoad: state.loginReducer.loginRequest
})
const mapDispatchToProps = (dispatch) => ({
    setLoginUser: (email, password) => dispatch(getLoginUser(email, password)),
    updateIsError : (isError) => dispatch(getLoginUserFailed(isError)),
    renewArticlesList: (key, page) => dispatch(updateArticlesList(key, page))
})
export default connect(mapSateToProps, mapDispatchToProps)(SignIn);