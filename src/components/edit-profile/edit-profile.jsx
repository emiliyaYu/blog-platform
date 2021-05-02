import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import classes from 'classnames';
import styles from './edit-profile.module.scss';
import localStorageService from "../../services/local-storage";
import updateUser, {editProfileStatus} from "../../redux/actions/edit-profile";
import openNotification from "../../services/notification/notification";
import validate from "./validate";
import {updateArticlesList} from "../../redux/actions/articles";
import * as path from '../../routes/index';
import {successStatus, errorStatus} from "../../constants/status";
import checkboxDisabledStatus from "../../utilts/checkboxDisabledStatus";

const EditProfile = ({updateProfile, statusOdEdit, updateStatus, page, renewArticlesList}) => {
    const {editProfileWrapper,editProfileTitle, profileWrapper, profileItem, profileTitle, profileInput, submitWrapper, submitButton, errorMessage, errorInput} = styles;

    const {register, handleSubmit, formState: {errors}} = useForm();

    const classOfInput = classes(profileInput, {[errorInput] : Object.keys(errors).length !== 0});

    const handlerSubmit = (data) => updateProfile(data)

    const history = useHistory();

    const isDisabled = checkboxDisabledStatus(statusOdEdit);

    const initHistory = useCallback(() => {
        if(statusOdEdit === successStatus) {
            renewArticlesList(5, page); // обновление списка статей после редактирвоания профиля, создания статьи и т.п.
            history.push(path.home);
            updateStatus(null)
        }
        if(statusOdEdit === errorStatus) {
            openNotification('error', 'Error', 'Update failed');
            updateStatus(null);
        }
    },[history, statusOdEdit, renewArticlesList, page, updateStatus])

    useEffect(() => initHistory(),[initHistory])

    return (
        <form className={editProfileWrapper} onSubmit={handleSubmit(handlerSubmit)}>
            <span className={editProfileTitle}>Edit Profile</span>
            <fieldset className={profileWrapper}>
                <label className={profileItem}>
                    <span className={profileTitle}>Username</span>
                    <input className={classOfInput} type='text' placeholder='username' disabled={isDisabled} {...register('username',{...validate.validateUsername})}/>
                    {errors.username && <p className={errorMessage}>{errors.username.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Email address</span>
                    <input className={classOfInput} type='email' placeholder='Email' disabled={isDisabled} {...register('email',{...validate.validateEmail})}/>
                    {errors.email && <p className={errorMessage}>{errors.email.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>New password</span>
                    <input className={classOfInput} type='password' placeholder='new password' disabled={isDisabled} {...register('password',{...validate.validatePassword})}/>
                    {errors.password && <p className={errorMessage}>{errors.password.message}</p>}
                </label>
                <label className={profileItem}>
                    <span className={profileTitle}>Avatar image (url)</span>
                    <input className={classOfInput} type='text'  placeholder='Avatar image' disabled={isDisabled} {...register('image', {...validate.validateAvatar})}/>
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
    updateStatus: ()=>{},
    statusOdEdit: 'loading'
}
EditProfile.propTypes = {
    updateProfile: PropTypes.func,
    updateStatus: PropTypes.func,
    renewArticlesList: PropTypes.func,
    page: PropTypes.number,
    statusOdEdit: PropTypes.string,
}
const mapStateToProps = (state) => ({
        page: state.articlesReducer.currentPage,
        statusOdEdit: state.updateEditProfile.editProfileStatus,
        isLogin: localStorageService().get('isLogin')
    })


const mapDispatchToProps = (dispatch) => ({
    updateProfile: (userData) => dispatch(updateUser(userData)),
    renewArticlesList:(key, page)=> dispatch(updateArticlesList(key, page)),
    updateStatus: (status) => dispatch(editProfileStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);