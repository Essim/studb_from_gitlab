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

const INITIAL_STATE = {
    user: {},
    connected: false,
    modalSignIn: false,
    formSignInError: false,
    formSignInErrorMessage: '',
    isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        /* To Finish */
        case FETCHING_SIGNIN:
            return {
                ...state,
                formSignInError: false,
                formSignInErrorMessage: '',
                isLoading: true,
                connected: false,
            };
        case FETCHED_SIGNIN:
            return {
                ...state,
                user: action.payload.user,
                connected: true,
                modalSignIn: false,
                formSignInError: false,
                formSignInErrorMessage: '',
                isLoading: false,
            };
        case FETCH_SIGNIN_FAIL:
            return {
                ...state,
                connected: false,
                formSignInError: true,
                formSignInErrorMessage: action.payload.message,
                isLoading: false,
            };
        case TOGGLE_MODAL_SIGNIN:
            return {
                ...state,
                modalSignIn: !state.modalSignIn,
                formSignInError: false,
                formSignInErrorMessage: '',
            };
        case FETCHING_INIT:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_INIT_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case FETCHING_LOGOUT:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case FETCHED_LOGOUT:
            return {
                ...state,
                user: {},
                connected: false,
                modalSignIn: false,
                formSignInError: false,
                formSignInErrorMessage: '',
                isLoading: false,
            };
        default:
            return state;
    }
}

export const isConnected = state => state;
