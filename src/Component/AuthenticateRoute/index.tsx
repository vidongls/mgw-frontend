import React from 'react';
import SecurityService from "../../Util/SecurityService";
import {AccessDenied} from '../AccessDenied';
import lodash from "lodash";
import {Navigate} from 'react-router-dom';

interface Props {
    children?: any
    permission?: string
}

export const AuthenticateRoute = (props: Props) => {

    if (!SecurityService.isLogged()) {
        if (!lodash.startsWith(window.location.pathname, '/login') || !lodash.startsWith(window.location.pathname, '/authentication')) {
            return <Navigate to={`/login?redirectBackUrl=${window.location.href}`}/>
        }
        return <Navigate to={'/login'}/>
    }

    let component = props.children

    if (props.permission && !SecurityService.can(props.permission)) {
        component = <AccessDenied/>
    }

    return component
}
