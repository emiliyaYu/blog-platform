import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import styles from './edit-profile.module.scss';
import {getUser} from "../../services/local-storage";
import updateUser, {editProfileFailed} from "../../redux/actions/edit-profile";
import openNotification from "../notification";
import validate from "./validate";
import {updateArticlesList} from "../../redux/actions/articles";

const EditProfile = ({updateProfile, token, isError, updateIsError, page, renewArticlesList}) => {
    const {editProfileWrapper,editProfileTitle, profileWrapper, profileItem, profileTitle, profileInput, submitWrapper, submitButton, errorMessage} = styles;

    const {register, handleSubmit, formState: {errors}} = useForm();

    const handlerSubmit = (data) => updateProfile(data, token)

    const history = useHistory();

    const initHistory = useCallback(() => {
        if(isError === false) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push('/');
            updateIsError(null)
        }
        if(isError === true) {
            openNotification('error', 'Error', 'Update failed');
            updateIsError(null);
        }
    },[isError, renewArticlesList, page, history, updateIsError])

    useEffect(() => initHistory(),[initHistory])

    return (
        <form className={editProfileWrapper}>
            <span className={editProfileTitle}>Edit Profile</span>
            <fieldset className={profileWrapper}>
                <label className={profileItem}>
                    <span className={profileTitle}>Username</span>
                    <input className={profileInput} type='text' placeholder='username' {...register('username',{...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Email address</span>
                    <input className={profileInput} type='email' placeholder='Email' {...register('email',{...validate.validateEmail})}/>
                    {errors.email && <p className={errorMessage}>{errors.email.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>New password</span>
                    <input className={profileInput} type='password' placeholder='new password' {...register('password',{...validate.validatePassword})}/>
                    {errors.password && <p className={errorMessage}>{errors.password.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Avatar image (url)</span>
                    <input className={profileInput} type='text'  placeholder='Avatar image' {...register('image', {...validate.validateAvatar})}/>
                    {errors.image && <p className={errorMessage}>{errors.image.message}</p>}
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
    renewArticlesList: ()=>{},
    page: 1,
    updateIsError: ()=>{},
    token: '',
    isError: false,
}
EditProfile.propTypes = {
    updateProfile: PropTypes.func,
    updateIsError: PropTypes.func,
    renewArticlesList: PropTypes.func,
    page: PropTypes.number,
    token: PropTypes.string,
    isError: PropTypes.bool
}
const mapStateToProps = (state) => {
    const user = getUser();
    const {token} = user;
    return {
        token,
        page: state.articlesReducer.currentPage,
        isError: state.updateEditProfile.editProfileFailed
    }
}


const mapDispatchToProps = (dispatch) => ({
    updateProfile: (userData, token) => dispatch(updateUser(userData, token)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateIsError: (isError) => dispatch(editProfileFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);