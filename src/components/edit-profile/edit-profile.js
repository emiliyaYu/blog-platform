import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import styles from './edit-profile.module.scss';
import {getUser} from "../../services/local-storage";
import updateUser, {editProfileFailed} from "../../redux/actions/edit-profile";
import openNotification from "../notification";

const EditProfile = ({updateProfile, token, isError, updateIsError}) => {
    const {editProfileWrapper,editProfileTitle, profileWrapper, profileItem, profileTitle, profileInput, submitWrapper, submitButton} = styles;

    const {register, handleSubmit} = useForm();

    const handlerSubmit = (data) => updateProfile(data, token)

    const history = useHistory();

    const initHistory = useCallback(() => {
        if(isError === false) {
            history.push('/');
            updateIsError(null)
        }
        if(isError === true) openNotification('error', 'Error', 'Update failed');
    },[isError, history, updateIsError])

    useEffect(() => initHistory(),[initHistory])

    return (
        <form className={editProfileWrapper}>
            <span className={editProfileTitle}>Edit Profile</span>
            <fieldset className={profileWrapper}>
                <label className={profileItem}>
                    <span className={profileTitle}>Username</span>
                    <input className={profileInput} type='text' placeholder='username' {...register('username')}/>
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Email address</span>
                    <input className={profileInput} type='email' placeholder='Email' {...register('email')}/>
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>New password</span>
                    <input className={profileInput} type='password' placeholder='new password' {...register('password')}/>
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Avatar image (url)</span>
                    <input className={profileInput} type='text'  placeholder='Avatar image' {...register('image')}/>
                </label>
            </fieldset>
            <fieldset className={submitWrapper}>
                <button type='button' className={submitButton} onClick={handleSubmit(handlerSubmit)}>Save</button>
            </fieldset>
        </form>
    )

}
EditProfile.defaultProps = {
    updateProfile: ()=>{},
    updateIsError: ()=>{},
    token: '',
    isError: false,
}
EditProfile.propTypes = {
    updateProfile: PropTypes.func,
    updateIsError: PropTypes.func,
    token: PropTypes.string,
    isError: PropTypes.bool
}
const mapStateToProps = (state) => {
    const user = getUser();
    const {token} = user;
    return {
        token,
        isError: state.updateEditProfile.editProfileFailed
    }
}


const mapDispatchToProps = (dispatch) => ({
    updateProfile: (userData, token) => dispatch(updateUser(userData, token)),
    updateIsError: (isError) => dispatch(editProfileFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);