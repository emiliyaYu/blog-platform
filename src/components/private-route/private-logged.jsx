import React from 'react';
import PropTypes from 'prop-types';
import {Route, useHistory} from 'react-router-dom';
import {home} from '../../routes/index'
import localStorageService from "../../services/local-storage";

const PrivateRoute = ({children, ...rest}) => {
    const history = useHistory();
    const isLogin = localStorageService().get('isLogin');

    return (
        <Route {...rest} render={() => isLogin ? history.push(home) : (children)} />
    )
}
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
export default PrivateRoute;