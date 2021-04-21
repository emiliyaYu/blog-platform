import React from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styles from './sign-up.module.scss'
import {getUser} from "../../redux/actions/registration";
import validate from "./validate";
import openNotification from "../notification";

const SignUp = ({setUser, regUser}) => {
    const {signUpWrapper, signUpTitle, registerWrapper, registerTitle, registerInput, personalInfoWrapper, personalInfo, personalInfoText, hasAccount,submitWrapper, registerItem, submitButton,
        personalInfoCheck, errorMessage} = styles;

    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const currentPassword = watch('registerPassword');


    const handlerSubmit = (data) => {
       const {username, registerEmail, registerPassword} = data;

        if(regUser) {
            openNotification('error', 'Request failed', 'Try again.')
        }
        return setUser(username, registerEmail, registerPassword);
    }

    return(
        <form className={signUpWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={signUpTitle}>Create new account</span>
            <fieldset className={registerWrapper}>
                <label className={registerItem}>
                    <span className={registerTitle}>username</span>
                    <input className={registerInput} type='text' placeholder='username'
                           {...register('username', {...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Email</span>
                    <input className={registerInput} type='email' placeholder='Email' {...register('registerEmail', {...validate.validateEmail})}/>
                    {errors.registerEmail && <p className={errorMessage}>{errors.registerEmail.message}</p>}
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Password</span>
                    <input className={registerInput} type='password' placeholder='Password'  {...register('registerPassword', {...validate.validatePassword})}/>
                </label>
                <label className={registerItem}>
                    <span className={registerTitle}>Repeat password</span>
                    <input className={registerInput} type='password'  placeholder='Repeat password' {...register('registerRepeatPassword', {validate: value => value === currentPassword})}/>
                    {errors.registerRepeatPassword && <p>Password does not match.</p>}
                </label>
                <fieldset className={personalInfoWrapper}>
                    <label className={personalInfo}>
                        <input type='checkbox' name='personalInfoAgree' className={personalInfoCheck} {...register('personalInfo', {...validate.validatePersonalInfo})}/>
                        <span className={personalInfoText}>I agree to the processing of my personal information</span>
                    </label>
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
    regUser: {}
}
SignUp.propTypes = {
    setUser: PropTypes.func,
    regUser: PropTypes.shape({})
}
const mapStateToProps = (state) => ({
    regUser: state.registrationSuccessReducer.errors
})
const mapDispatchToProps = (dispatch) => ({
    setUser: (username, email, password) => dispatch(getUser(username, email, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);