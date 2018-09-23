import {
    ADMIN_ADD_COURSE_FAIL, ADMIN_ADD_DIVISION_FAIL, ADMIN_ADDED_COURSE, ADMIN_ADDED_DIVISION,
    ADMIN_ADDING_COURSE, ADMIN_ADDING_DIVISION,
    ADMIN_BAN_USER_FAIL, ADMIN_BANNED_USER,
    ADMIN_BANNING_USER, ADMIN_DELETE_COMMENT_FAIL, ADMIN_DELETE_COURSE_FAIL, ADMIN_DELETE_DIVISION_FAIL,
    ADMIN_DELETE_DOCUMENT_FAIL,
    ADMIN_DELETED_COMMENT,
    ADMIN_DELETED_COURSE, ADMIN_DELETED_DIVISION,
    ADMIN_DELETED_DOCUMENT,
    ADMIN_DELETING_COMMENT, ADMIN_DELETING_COURSE, ADMIN_DELETING_DIVISION,
    ADMIN_DELETING_DOCUMENT,
    ADMIN_FETCH_DIVISIONS_FAIL,
    ADMIN_FETCH_DOCUMENTS_FAIL,
    ADMIN_FETCH_USERS_FAIL,
    ADMIN_FETCHED_DIVISIONS,
    ADMIN_FETCHED_DOCUMENTS,
    ADMIN_FETCHED_USERS,
    ADMIN_FETCHING_DIVISIONS,
    ADMIN_FETCHING_DOCUMENTS,
    ADMIN_FETCHING_USERS,
    ADMIN_MODIFIED_ROLE,
    ADMIN_MODIFY_ROLE_FAIL,
    ADMIN_MODIFYING_ROLE, ADMIN_TOGGLE_MODAL_COURSE, ADMIN_TOGGLE_MODAL_DIVISION,
    ADMIN_TOGGLE_MODAL_USER,
    ADMIN_TOGGLE_REFRESH,
    ADMIN_TOGGLE_REFRESH_COMMENTS,
    ADMIN_TOGGLE_REFRESH_COURSES,
    ADMIN_TOGGLE_REFRESH_DIVISIONS,
    ADMIN_TOGGLE_REFRESH_DOCUMENTS,
    ADMIN_UNBAN_USER_FAIL,
    ADMIN_UNBANNED_USER,
    ADMIN_UNBANNING_USER
} from "../../constants";

const INITIAL_STATE = {
    users: [],
    userMessage: '',
    userError: false,
    commentMessage: '',
    commentError: false,
    courseError: false,
    courseMessage: '',
    documentMessage: '',
    documentError: false,
    divisionError: false,
    divisionMessage: '',
    divisions: [],
    documents: [],
    isFetchingUsers: false,
    isFetchingDivisions: false,
    isFetchingDocuments: false,
    isBanningUser: false,
    isUnBanningUser: false,
    isModifyingUserRole: false,
    isDeletingComment: false,
    isDeletingDocument: false,
    isDeletingCourse: false,
    isAddingCourse: false,
    isAddingDivision: false,
    isDeletingDivision: false,
    refreshUsers: false,
    refreshComments: false,
    refreshDocuments: false,
    refreshDivisions: false,
    refreshCourses: false,
    isModalUserOpen: false,
    isModalSectionOpen: false,
    isModalDivisionOpen: false,
    selectedUser: {},
};

export default function (state= INITIAL_STATE, action) {
    switch (action.type) {
        case ADMIN_FETCHING_USERS:
            return {
                ...state,
                isFetchingUsers: true,
            };
        case ADMIN_FETCH_USERS_FAIL:
            return {
                ...state,
                isFetchingUsers: false,
            };
        case ADMIN_FETCHED_USERS:
            return {
                ...state,
                users: action.payload.users,
                isFetchingUsers: false,
                refreshUsers: true,
            };
        case ADMIN_FETCHING_DIVISIONS:
            return {
                ...state,
                isFetchingDivisions: true,
            };
        case ADMIN_FETCH_DIVISIONS_FAIL:
            return {
                ...state,
                isFetchingDivisions: false,
            };
        case ADMIN_FETCHED_DIVISIONS:
            return {
                ...state,
                divisions: action.payload.divisions,
                isFetchingDivisions: false,
                refreshDivisions: true,
                refreshCourses: true,
            };
        case ADMIN_FETCHING_DOCUMENTS:
            return {
                ...state,
                isFetchingDocuments: true,
            };
        case ADMIN_FETCH_DOCUMENTS_FAIL:
            return {
                ...state,
                isFetchingDocuments: false,
            };
        case ADMIN_FETCHED_DOCUMENTS:
            return {
                ...state,
                documents: action.payload.documents,
                isFetchingDocuments: false,
                refreshComments: true,
                refreshDocuments: true,
            };
        case ADMIN_BANNING_USER:
            return {
                ...state,
                isBanningUser: true,
                userMessage: '',
                userError: false,
            };
        case ADMIN_BAN_USER_FAIL:
            return {
                ...state,
                isBanningUser: false,
                userMessage: action.payload.message,
                userError: true,
            };
        case ADMIN_BANNED_USER:
            return {
                ...state,
                isBanningUser: false,
                userMessage: action.payload.message,
                userError: false,
            };
        case ADMIN_UNBANNING_USER:
            return {
                ...state,
                isUnBanningUser: true,
                userMessage: '',
                userError: false,
            };
        case ADMIN_UNBAN_USER_FAIL:
            return {
                ...state,
                isUnBanningUser: false,
                userMessage: action.payload.message,
                userError: true,
            };
        case ADMIN_UNBANNED_USER:
            return {
                ...state,
                isUnBanningUser: false,
                userMessage: action.payload.message,
                userError: false,
            };
        case ADMIN_TOGGLE_REFRESH:
            return {
                ...state,
                refreshUsers: !state.refreshUsers,
            };
        case ADMIN_TOGGLE_REFRESH_COMMENTS:
            return {
                ...state,
                refreshComments: !state.refreshComments,
            };
        case ADMIN_TOGGLE_REFRESH_DOCUMENTS:
            return {
                ...state,
                refreshDocuments: !state.refreshDocuments,
            };
        case ADMIN_TOGGLE_REFRESH_DIVISIONS:
            return {
                ...state,
                refreshDivisions: !state.refreshDivisions,
            };
        case ADMIN_TOGGLE_REFRESH_COURSES:
            return {
                ...state,
                refreshCourses: !state.refreshCourses,
            };
        case ADMIN_TOGGLE_MODAL_USER:
            return {
                ...state,
                isModalUserOpen: !state.isModalUserOpen,
                selectedUser: action.payload.user,
            };
        case ADMIN_MODIFYING_ROLE:
            return {
                ...state,
                isModifyingUserRole: true,
                userMessage: '',
                userError: false,
            };
        case ADMIN_MODIFY_ROLE_FAIL:
            return {
                ...state,
                isModifyingUserRole: false,
                userMessage: action.payload.message,
                userError: true,
            };
        case ADMIN_MODIFIED_ROLE:
            return {
                ...state,
                isModifyingUserRole: false,
                userMessage: action.payload.message,
                selectedUser: action.payload.user,
                userError: false,
            };
        case ADMIN_DELETING_COMMENT:
            return {
                ...state,
                isDeletingComment: true,
                commentMessage: '',
                commentError: false,
            };
        case ADMIN_DELETE_COMMENT_FAIL:
            return {
                ...state,
                isDeletingComment: false,
                commentMessage: action.payload.message,
                commentError: true,
            };
        case ADMIN_DELETED_COMMENT:
            return {
                ...state,
                isDeletingComment: false,
                commentMessage: action.payload.message,
                commentError: false,
            };
        case ADMIN_DELETING_DOCUMENT:
            return {
                ...state,
                isDeletingDocument: true,
                documentMessage: '',
                documentError: false,
            };
        case ADMIN_DELETE_DOCUMENT_FAIL:
            return {
                ...state,
                isDeletingDocument: false,
                documentMessage: action.payload.message,
                documentError: true,
            };
        case ADMIN_DELETED_DOCUMENT:
            return {
                ...state,
                isDeletingDocument: false,
                documentMessage: action.payload.message,
                documentError: false,
            };
        case ADMIN_DELETING_COURSE:
            return {
                ...state,
                isDeletingCourse: true,
                courseMessage: '',
                courseError: false,
            };
        case ADMIN_DELETE_COURSE_FAIL:
            return {
                ...state,
                isDeletingCourse: false,
                courseMessage: action.payload.message,
                courseError: true,
            };
        case ADMIN_DELETED_COURSE:
            return {
                ...state,
                isDeletingCourse: false,
                courseMessage: action.payload.message,
                courseError: false,
            };
        case ADMIN_ADDING_COURSE:
            return {
                ...state,
                isAddingCourse: true,
                courseMessage: '',
                courseError: false,
            };
        case ADMIN_ADD_COURSE_FAIL:
            return {
                ...state,
                isAddingCourse: false,
                courseMessage: action.payload.message,
                courseError: true,
            };
        case ADMIN_ADDED_COURSE:
            return {
                ...state,
                isAddingCourse: false,
                courseMessage: action.payload.message,
                courseError: false,
            };
        case ADMIN_DELETING_DIVISION:
            return {
                ...state,
                isDeletingDivision: true,
                divisionMessage: '',
                divisionError: false,
            };
        case ADMIN_DELETE_DIVISION_FAIL:
            return {
                ...state,
                isDeletingDivision: false,
                divisionMessage: action.payload.message,
                divisionError: true,
            };
        case ADMIN_DELETED_DIVISION:
            return {
                ...state,
                isDeletingDivision: false,
                divisionMessage: action.payload.message,
                divisionError: false,
            };
        case ADMIN_ADDING_DIVISION:
            return {
                ...state,
                isAddingDivision: true,
                divisionMessage: '',
                divisionError: false,
            };
        case ADMIN_ADD_DIVISION_FAIL:
            return {
                ...state,
                isAddingDivision: false,
                divisionMessage: action.payload.message,
                divisionError: true,
            };
        case ADMIN_ADDED_DIVISION:
            return {
                ...state,
                isAddingDivision: false,
                divisionMessage: action.payload.message,
                divisionError: false,
            };
        case ADMIN_TOGGLE_MODAL_COURSE:
            return {
                ...state,
                isModalCourseOpen: !state.isModalCourseOpen,
            };
        case ADMIN_TOGGLE_MODAL_DIVISION:
            return {
                ...state,
                isModalDivisionOpen: !state.isModalDivisionOpen,
            };
        default:
            return state;
    }
}
