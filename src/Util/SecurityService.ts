import lodash from 'lodash';
import moment from 'moment';
import localStore from './localStore';


class SecurityService {

    static can = (permission: string) => {
        const permissions = localStore.getJson('permissions') || [];
        return permissions.includes(permission);
    };

    static isLogged = () => {
        const loginSession = localStore.getJson('loginSession');
        const accessToken = lodash.get(loginSession, 'accessToken');
        const expireAt = lodash.get(loginSession, 'expireAt');
        return accessToken && moment(expireAt).diff(moment.now());
    };

    static getUser = () => {
        if (SecurityService.isLogged()) {
            return localStore.getJson('loggedUser');
        }
    };
}

export default SecurityService;