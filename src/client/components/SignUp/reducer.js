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

const INITIAL_STATE = {
    user: {},
    modalSignUp: false,
    formErrorMessage: '',
    formError: false,
    isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOGGLE_MODAL_SIGNUP:
            return {
                ...state,
                modalSignUp: !state.modalSignUp,
                formErrorMessage: '',
                formError: false,
                isLoading: false,
            };
        case FETCHING_START_SIGNUP:
            return {
                ...state,
                user: action.payload.user,
                modalSignUp: true,
                formErrorMessage: '',
                formError: false,
                isLoading: true,
            };
        case FETCHING_SIGNUP:
            return {
                ...state,
                formErrorMessage: '',
                formError: false,
                isLoading: true,
                modalSignUp: true,
            };
        case FETCHED_SIGNUP:
            return {
                ...state,
                user: action.payload.user,
                modalSignUp: false,
                formErrorMessage: '',
                formError: false,
                isLoading: false,
            };
        case FETCHED_START_SIGNUP:
            return {
                ...state,
                sections: action.payload.sections,
                isLoading: false,
                formError: false,
                formErrorMessage: false,
            };
        case FETCH_START_SIGNUP_ERROR:
        case FETCH_SIGNUP_ERROR:
            return {
                ...state,
                formErrorMessage: action.payload.message,
                formError: true,
                isLoading: false,
            };
        case LOGOUT_SIGNUP:
            return {
                ...state,
                user: {},
                modalSignUp: false,
                formErrorMessage: '',
                formError: false,
                isLoading: false,
            };
        default:
            return state;
    }
}
