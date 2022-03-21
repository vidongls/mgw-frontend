const appConfig = {
    apiUrl: process.env.REACT_APP_API_URL,
    loginUrl: process.env.REACT_APP_LOGIN_URL,
    logoutUrl: process.env.REACT_APP_LOGOUT_URL,
    authenticationUrl: window.location.origin + '/authentication',
};

export default appConfig;