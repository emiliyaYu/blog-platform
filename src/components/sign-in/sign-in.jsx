import React, {useEffect, useCallback} from 'react';
import {connect} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import classes from 'classnames';
import PropTypes from 'prop-types';
import styles from './sign-in.module.scss'
import {getLoginUser, getLoginUserStatus} from "../../redux/actions/login";
import validate from "./validate";
import openNotification from "../../services/notification/notification";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import checkboxDisabledStatus from "../../utilts/checkboxDisabledStatus";
import {successStatus, errorStatus} from "../../constants/status";


const SignIn = ({setLoginUser, statusLogin, updateStatus, page, renewArticlesList}) => {
    const {signInWrapper,signInTitle, signInForm,signInItem, signInText, signInInput, signInSubmit, signInButton, hasAccount, errorMessage, errorInput} = styles;

    const history = useHistory();

   const isDisabled = checkboxDisabledStatus(statusLogin);

    const {register, handleSubmit, formState: {errors}} = useForm();

    const classOfInput = classes( signInInput, { [errorInput] : Object.keys(errors).length !== 0});

    const handlerSubmit = (data) => {
        const {loginEmail, loginPassword} = data;
        return setLoginUser(loginEmail, loginPassword);
    }

    const initHistory = useCallback(() => {
        if(statusLogin === successStatus) {
            renewArticlesList(5, page)
            history.push('/');
            updateStatus(null)
        }
        if(statusLogin === errorStatus) {
            openNotification('error', 'Error', 'Invalid email or password');
            updateStatus(null)
        }
    }, [statusLogin, renewArticlesList, page, history, updateStatus])

    useEffect(() => {
       initHistory()
    },[initHistory])

    return (
        <form  className={signInWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signInTitle}>Sign In</span>
            <div className={signInForm}>
                <label className={signInItem}>
                    <span className={signInText}>Email</span>
                    <input className={classOfInput} type='email' placeholder='Email' disabled={isDisabled} {...register('loginEmail',{...validate.validateLoginEmail})}/>
                    {errors.loginEmail && <p className={errorMessage}>{errors.loginEmail.message}</p>}
                </label>
                <label className={signInItem}>
                    <span className={signInText}>Password</span>
                    <input className={classOfInput} type='password' placeholder='Password' disabled={isDisabled} {...register('loginPassword', {...validate.validatePassword})}/>
                    {errors.loginPassword && <p className={errorMessage}>{errors.loginPassword.message}</p>}
                </label>
            </div>
            <div className={signInSubmit}>
                <button className={signInButton} type='button' onClick={handleSubmit(handlerSubmit)} disabled={isDisabled}>Login</button>
                <span className={hasAccount}>Don’t have an account? <Link to={path.signUp}>Sign Up.</Link></span>
            </div>
        </form>
    )
}
SignIn.defaultProps = {
    setLoginUser: ()=>{},
    updateStatus: ()=>{},
    renewArticlesList:()=>{},
    statusLogin: '',
    page: 1,
}
SignIn.propTypes = {
    setLoginUser: PropTypes.func,
    updateStatus: PropTypes.func,
    renewArticlesList: PropTypes.func,
    statusLogin: PropTypes.string,
    page: PropTypes.number,
}
const mapSateToProps = (state) => ({
    statusLogin: state.loginReducer.loginStatus,
    page: state.articlesReducer.currentPage,
})
const mapDispatchToProps = (dispatch) => ({
    setLoginUser: (email, password) => dispatch(getLoginUser(email, password)),
    updateStatus : (status) => dispatch(getLoginUserStatus(status)),
    renewArticlesList: (key, page) => dispatch(updateArticlesList(key, page))
})
export default connect(mapSateToProps, mapDispatchToProps)(SignIn);