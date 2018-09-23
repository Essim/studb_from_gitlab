import {
    TOGGLE_CHANGE_SECTION,
    TOGGLE_CHANGE_GRADES,
    FETCHING_MY_DIVISION,
    FETCHED_MY_DIVISION,
    FETCH_MY_DIVISION_FAIL,
    FETCHING__DIVISIONS,
    FETCHED_DIVISIONS,
    FETCH_DIVISIONS_FAIL,
    UPDATING__MY_DIVISION,
    UPDATED_MY_DIVISION,
    UPDATE_MY_DIVISION_FAIL,
    SET_GRADES,
    SET_USER_GRADES,
    UPDATING__MY_GRADES,
    UPDATE_MY_GRADES_FAIL,
    UPDATED_MY_GRADES,
    TOGGLE_CHANGE_PASSWORD,
    UPDATING__MY_PASSWORD,
    UPDATED_MY_PASSWORD,
    UPDATE_MY_PASSWORD_FAIL
} from "../../constants";

const INITIAL_STATE = {
    isChangingSection: false,
    isChangingGrades: false,
    isChangingPassword: false,
    myDivision: {},
    isLoadingMyDivision: false,
    isLoadingDivisions: false,
    isUpdatingMyDivision: false,
    isUpdatingMyGrades: false,
    errorGrades: false,
    errorMessageGrades: '',
    errorPassword: false,
    messagePassword: '',
    divisions: [],
    userGrades: [],
    grades: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOGGLE_CHANGE_SECTION:
            return {
                ...state,
                isChangingSection: !state.isChangingSection,
                messagePassword: '',
            };
        case TOGGLE_CHANGE_GRADES:
            return {
                ...state,
                isChangingGrades: !state.isChangingGrades,
                errorGrades: false,
                errorMessageGrades: '',
                messagePassword: '',
            };
        case TOGGLE_CHANGE_PASSWORD:
            return {
                ...state,
                isChangingPassword: !state.isChangingPassword,
                messagePassword: '',
            };
        case FETCHING_MY_DIVISION:
            return {
                ...state,
                isLoadingMyDivision: true,
            };
        case FETCH_MY_DIVISION_FAIL:
            return {
                ...state,
                isLoadingMyDivision: false,
            };
        case FETCHED_MY_DIVISION:
            return {
                ...state,
                isLoadingMyDivision: false,
                myDivision: action.payload.division,
            };
        case FETCHING__DIVISIONS:
            return {
                ...state,
                isLoadingDivisions: true,
            };
        case FETCH_DIVISIONS_FAIL:
            return {
                ...state,
                isLoadingDivisions: false,
            };
        case FETCHED_DIVISIONS:
            return {
                ...state,
                isLoadingDivisions: false,
                divisions: action.payload.divisions,
            };
        case UPDATING__MY_DIVISION:
            return {
                ...state,
                isUpdatingMyDivision: true,
            };
        case UPDATE_MY_DIVISION_FAIL:
            return {
                ...state,
                isUpdatingMyDivision: false,
            };
        case UPDATED_MY_DIVISION:
            return {
                ...state,
                isUpdatingMyDivision: false,
                isChangingSection: false,
            };
        case SET_GRADES:
            return {
                ...state,
                grades: action.payload.grades,
            };
        case SET_USER_GRADES:
            return {
                ...state,
                userGrades: action.payload.grades,
            };
        case UPDATING__MY_GRADES:
            return {
                ...state,
                isUpdatingMyGrades: true,
                errorGrades: false,
                errorMessageGrades: '',
            };
        case UPDATE_MY_GRADES_FAIL:
            return {
                ...state,
                isUpdatingMyGrades: false,
                errorGrades: true,
                errorMessageGrades: action.payload.message,
            };
        case UPDATED_MY_GRADES:
            return {
                ...state,
                grades: action.payload.grades,
                userGrades: action.payload.grades,
                isUpdatingMyGrades: false,
                isChangingGrades: false,
                errorGrades: false,
                errorMessageGrades: '',
            };
        case UPDATING__MY_PASSWORD:
            return {
                ...state,
                isUpdatingMyPassword: true,
                errorPassword: false,
                messagePassword: '',
            };
        case UPDATE_MY_PASSWORD_FAIL:
            return {
                ...state,
                isUpdatingMyPassword: false,
                errorPassword: true,
                messagePassword: action.payload.message,
            };
        case UPDATED_MY_PASSWORD:
            return {
                ...state,
                isUpdatingMyPassword: false,
                errorPassword: false,
                messagePassword: 'Modification réussie',
                isChangingPassword: false,
            };
        default:
            return state;
    }
}
