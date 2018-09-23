import {startSignup, logoutSignup} from '../SignUp/action';
import callApi from '../../util/apiCaller';
import {
    FETCH_INIT_FAIL,
    FETCH_LOGOUT_FAIL,
    FETCH_SIGNIN_FAIL,
    FETCHED_LOGOUT,
    FETCHED_SIGNIN,
    FETCHING_INIT,
    FETCHING_LOGOUT,
    FETCHING_SIGNIN,
    TOGGLE_MODAL_SIGNIN,

} from '../../constants';


export function toggleModalSignIn() {
    return {
        type: TOGGLE_MODAL_SIGNIN,
    };
}

function fetchedLogout() {
    return {
        type: FETCHED_LOGOUT,
        payload: {},
    };
}

export function fetchingLogout() {
    return {
        type: FETCHING_LOGOUT,
        payload: {},
    };
}

export function fetchLogoutFail() {
    return {
        type: FETCH_LOGOUT_FAIL,
        payload: {},
    };
}

export function logout() {
    return (dispatch) => {
        dispatch(fetchingLogout());
        callApi('user/logout', 'post', {}).then(() => {
            dispatch(logoutSignup());
            dispatch(fetchedLogout());
        }).catch(() => {
            dispatch(fetchLogoutFail());
        });
    };
}

export function dispatchSignUp(user) {
    const userToSend = {
        email: user.email,
        userID: user.userID,
    };
    /* For now only redirecting to signup */
    return (dispatch) => {
        dispatch(startSignup(userToSend));
        dispatch(toggleModalSignIn());
    };
}

export function fetchingSignIn() {
    return {
        type: FETCHING_SIGNIN,
        payload: {},
    };
}

export function fetchedSignIn(response) {
    const user = {
        dateSignIn: response.data.date_connection,
        dateSignUp: response.data.date_creation,
        email: response.data.email,
        cuid: response.data.cuid,
        userID: response.data.token,
        division: response.data.cuid_division,
        grades: response.data.group,
        pseudo: response.data.name,
        role: response.data.role,
    };
    return {
        type: FETCHED_SIGNIN,
        payload: {
            user,
        },
    };
}

export function signUpCallBack(user) {
    return {
        type: FETCHED_SIGNIN,
        payload: {
            user,
        },
    };
}

export function fetchSignInFail(error) {
    return {
        type: FETCH_SIGNIN_FAIL,
        payload: {
            message: error,
        },
    };
}

export function signIn(user) {
    return (dispatch) => {
        dispatch(fetchingSignIn());
        callApi('user/signin', 'post', {user}).then((response) => {
            dispatch(fetchedSignIn(response));
        }).catch((error) => {
            dispatch(fetchSignInFail(error.response.data.error));
        });
    };
}

export function facebookOauth(responseForm) {
    const user = {
        email: responseForm.email,
        userID: responseForm.userID,
    };
    return (dispatch) => {
        dispatch(fetchingSignIn());
        callApi('user/signinoauth', 'post', {user}).then((response) => {
            if (response.data === '')
                dispatch(dispatchSignUp(user));

            else
                dispatch(fetchedSignIn(response));

        }).catch((error) => {
            dispatch(fetchSignInFail(error.response.data.error));
        });
    };
}

export function googleOauth(responseForm) {
    const user = {
        email: responseForm.w3.U3,
        userID: responseForm.googleId,
    };
    return (dispatch) => {
        dispatch(fetchingSignIn());
        callApi('user/signinoauth', 'post', {user}).then((response) => {
            if (response.data === '')
                dispatch(dispatchSignUp(user));
            else
                dispatch(fetchedSignIn(response));

        }).catch((error) => {
            dispatch(fetchSignInFail(error.response.data.error));
        });
    };
}

export function fetchingInit() {
    return {
        type: FETCHING_INIT,
        payload: {},
    };
}

export function fetchInitFail() {
    return {
        type: FETCH_INIT_FAIL,
        payload: {},
    };
}

export function init() {
    return (dispatch) => {
        dispatch(fetchingInit());
        callApi('user/init', 'post', {}).then((response) => {
            if (response.data !== '')
                dispatch(fetchedSignIn(response));

        }).catch((error) => {
            dispatch(fetchInitFail(error));
        });
    };
}

