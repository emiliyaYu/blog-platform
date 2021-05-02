import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import classes from 'classnames';
import styles from './edit-profile.module.scss';
import {getItem} from "../../services/local-storage";
import updateUser, {editProfileFailed} from "../../redux/actions/edit-profile";
import openNotification from "../../services/notification/notification";
import validate from "./validate";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';

const EditProfile = ({updateProfile, isError, updateIsError, page, renewArticlesList}) => {
    const {editProfileWrapper,editProfileTitle, profileWrapper, profileItem, profileTitle, profileInput, submitWrapper, submitButton, errorMessage, errorInput} = styles;

    const {register, handleSubmit, formState: {errors}} = useForm();

    const classOfInput = classes(profileInput, {[errorInput] : Object.keys(errors).length !== 0});

    const handlerSubmit = (data) => updateProfile(data)

    const history = useHistory();

    const initHistory = useCallback(() => {
        if(isError === false) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push(path.home);
            updateIsError(null)
        }
        if(isError === true) {
            openNotification('error', 'Error', 'Update failed');
            updateIsError(null);
        }
    },[history, isError, renewArticlesList, page, updateIsError])

    useEffect(() => initHistory(),[initHistory])

    return (
        <form className={editProfileWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={editProfileTitle}>Edit Profile</span>
            <fieldset className={profileWrapper}>
                <label className={profileItem}>
                    <span className={profileTitle}>Username</span>
                    <input className={classOfInput} type='text' placeholder='username' {...register('username',{...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Email address</span>
                    <input className={classOfInput} type='email' placeholder='Email' {...register('email',{...validate.validateEmail})}/>
                    {errors.email && <p className={errorMessage}>{errors.email.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>New password</span>
                    <input className={classOfInput} type='password' placeholder='new password' {...register('password',{...validate.validatePassword})}/>
                    {errors.password && <p className={errorMessage}>{errors.password.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Avatar image (url)</span>
                    <input className={classOfInput} type='text'  placeholder='Avatar image' {...register('image', {...validate.validateAvatar})}/>
                    {errors.image && <p className={errorMessage}>{errors.image.message}</p>}
                </label>
            </fieldset>
            <fieldset className={submitWrapper}>
                <button type='submit' className={submitButton} onSubmit={handleSubmit(handlerSubmit)}>Save</button>
            </fieldset>
        </form>
    )

}
EditProfile.defaultProps = {
    updateProfile: ()=>{},
    renewArticlesList: ()=>{},
    page: 1,
    updateIsError: ()=>{},
    isError: false,
    isLogin: false,
}
EditProfile.propTypes = {
    updateProfile: PropTypes.func,
    updateIsError: PropTypes.func,
    renewArticlesList: PropTypes.func,
    page: PropTypes.number,
    isError: PropTypes.bool,
    isLogin: PropTypes.bool
}
const mapStateToProps = (state) => ({
        page: state.articlesReducer.currentPage,
        isError: state.updateEditProfile.editProfileFailed,
        isLogin: getItem('isLogin')
    })


const mapDispatchToProps = (dispatch) => ({
    updateProfile: (userData) => dispatch(updateUser(userData)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateIsError: (isError) => dispatch(editProfileFailed(isError))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);