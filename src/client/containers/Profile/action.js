import {
    FETCH_CONNECTED_USER,
    FETCHING_USER,
    FETCH_USER_FAIL,
    FETCHED_USER,
    FETCHING_DOCUMENTS,
    FETCH_DOCUMENTS_FAIL,
    FETCHED_DOCUMENTS,
} from '../../constants';

import callApi from '../../util/apiCaller';

export function fetchingUser() {
    return {
        type: FETCHING_USER,
        payload: {}
    };
}

export function fetchedUser(user) {
    return {
        type: FETCHED_USER,
        payload: {
            user,
        }
    }
}

export function fetchUserFail() {
    return {
        type: FETCH_USER_FAIL,
        payload: {},
    }
}

export function fetchUser(pseudo) {
    return (dispatch) => {
        dispatch(fetchingUser());
        callApi(`user/pseudo/${pseudo}`, 'get', {}).then((response) => {
            if(response.data === null)
                dispatch(fetchedUser({}));
            else {
                const user = {
                    pseudo: response.data.user.name,
                    dateSignIn: response.data.user.date_connection,
                    dateSignUp:response.data.user.date_creation,
                    email:response.data.user.email,
                    cuid:response.data.user.cuid,
                    userID:response.data.user.token,
                    division:response.data.user.cuid_division,
                    grades:response.data.user.group,
                };
                dispatch(fetchedUser(user));
            }
        }).catch(() => {
           dispatch(fetchUserFail());
        });
    };
}

export function fetchConnectedUser(user) {
    return {
        type: FETCH_CONNECTED_USER,
        payload: {
            user
        },
    }
}

export function fetchingDocuments() {
    return {
        type: FETCHING_DOCUMENTS,
        payload: {},
    };
}

export function fetchedDocuments(documents) {
    return {
        type: FETCHED_DOCUMENTS,
        payload: {
            documents,
        }
    };
}

export function fetchDocumentsFail() {
    return {
        type: FETCH_DOCUMENTS_FAIL,
        payload: {},
    }
}

export function fetchDocuments() {
    return (dispatch) => {
        dispatch(fetchingDocuments());
        callApi('document', 'get', {}).then((response) => {
            const documents = response.data.documents;
            dispatch(fetchedDocuments(documents));
        }).catch(() => {
            dispatch(fetchDocumentsFail());
        });
    }
}




