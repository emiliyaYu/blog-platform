import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Avatar} from "antd";
import {Link} from 'react-router-dom'
import classes from 'classnames';
import styles from './header.module.scss'
import {getIsLogin, getUser, removeUser} from "../../services/local-storage";
import {isLogIn} from "../../redux/actions/login";



const Header = ({user, updateIsLogin}) => {
    const {header, titleHeader, buttonHeaderWrapper, buttonHeader, SignIn, SignUp, createArticleButton, userName, logOutButton, buttonAuthWrapper, link, avatar} = styles;
    const signInClass = classes(buttonHeader, SignIn);
    const signUpClass = classes(buttonHeader, SignUp);

    const isLogin = getIsLogin();

    const handlerLogOut = () => {
        updateIsLogin(false);
        removeUser();
    }


    const defaultImage = "https://static.productionready.io/images/smiley-cyrus.jpg"; // дефотная картинка

    const NotAuthorized = () => ( // когда пользователь не авторизирован
            <div className={buttonHeaderWrapper}>
                <Link className={link} to='/sign_in'><button type='button' className={signInClass}>Sign In</button></Link>
                <Link to='/sign_up'><button type='button' className={signUpClass}>Sign Up</button></Link>
            </div>
        )
    const Authorized = () => { // когда пользователь авторизирован
        if(user === null) return null;
        const {username, image} = user;
        return (
            <div className={buttonAuthWrapper}>
                <Link to='/new-article'><button className={createArticleButton} type='button'>Create Article</button></Link>
                <Link to='/profile' className={link}><span className={userName}>{username}</span></Link>
                <Link to='/profile' className={link}><Avatar size={45} src={image !== null ? image : defaultImage} className={avatar}/></Link>
                <button className={logOutButton} type='button' onClick={handlerLogOut}>Log Out</button>
            </div>
        )
    }

    return (
        <header className={header}>
            <Link to='/' className={link}><span className={titleHeader}>Realworld Blog</span></Link>
            {isLogin === false || isLogin === null? <NotAuthorized/> : <Authorized/>}
        </header>
    )
}
Header.defaultProps = {
    user: {},
    updateIsLogin: ()=>{}
}
Header.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.string,

    }),
    updateIsLogin: PropTypes.func
}
const mapStateToProps = () => {
    const userData = getUser();
    return {
        user: userData
    }
}
const mapDispatchToProps = (dispatch) =>({
  updateIsLogin: (isLogin) => dispatch(isLogIn(isLogin))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);