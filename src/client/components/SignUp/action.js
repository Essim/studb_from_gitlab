/* eslint-disable no-param-reassign */
import callApi from '../../util/apiCaller';
import {signUpCallBack} from '../SignIn/action';

import {
    TOGGLE_MODAL_SIGNUP,
    LOGOUT_SIGNUP,
    FETCHED_SIGNUP,
    FETCH_SIGNUP_ERROR,
    FETCHING_SIGNUP,
    FETCHING_START_SIGNUP,
    FETCH_START_SIGNUP_ERROR,
    FETCHED_START_SIGNUP
} from "../../constants";


export function toggleModalSignUp() {
    return {
        type: TOGGLE_MODAL_SIGNUP,
    };
}

export function logoutSignup() {
    return {
        type: LOGOUT_SIGNUP,
        payload: {},
    };
}

export function fetchedSignUp(user) {
    return {
        type: FETCHED_SIGNUP,
        payload: {
            user,
        },
    };
}

export function fetchSignUpError(response) {
    return {
        type: FETCH_SIGNUP_ERROR,
        payload: {
            message: response,
        },
    };
}


export function fetchingSignup() {
    return {
        type: FETCHING_SIGNUP,
        payload: {},
    };
}

export function submitSignup(user) {
    return (dispatch) => {
        dispatch(fetchingSignup());
        callApi('user/signup', 'post', {user}).then((response) => {
            user.cuid = response.data.cuid;
            dispatch(fetchedSignUp(user));
            dispatch(signUpCallBack(user));
        }).catch((error) => {
            dispatch(fetchSignUpError(error.response.data.error));
        });
    };
}

export function fetchingStartSignup(user) {
    return {
        type: FETCHING_START_SIGNUP,
        payload: {
            user,
        },
    };
}

export function fetchStartSignupFail(response) {
    return {
        type: FETCH_START_SIGNUP_ERROR,
        payload: {
            message: response,
        },
    };
}

export function fetchedStartSignup(sections) {
    return {
        type: FETCHED_START_SIGNUP,
        payload: {
            sections,
        },
    };
}

export function startSignup(user) {
    return (dispatch) => {
        dispatch(fetchingStartSignup(user));
        callApi('division', 'get', {}).then((response) => {
            dispatch(fetchedStartSignup(response.data.divisions));
        }).catch((error) => {
            dispatch(fetchStartSignupFail(error.response.data.error));
        });
    };
}
