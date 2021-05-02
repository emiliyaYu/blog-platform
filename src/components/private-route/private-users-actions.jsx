import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Route, useHistory} from 'react-router-dom';
import {home} from '../../routes/index'
import localStorageService from "../../services/local-storage";

const PrivateUsersActions = ({children, isLogin, ...rest}) => {
    const history = useHistory();
    return (
        <Route {...rest} render={() => isLogin ? (children) : history.push(home)} />
    )
}
PrivateUsersActions.defaultProps = {
    isLogin: false,
}
PrivateUsersActions.propTypes = {
    children: PropTypes.node.isRequired,
    isLogin: PropTypes.bool
}
const mapStateToProps = () => ({
    isLogin: localStorageService().get('isLogin')
})
export default connect(mapStateToProps)(PrivateUsersActions);