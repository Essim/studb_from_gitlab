import callApi from '../../util/apiCaller';
import {
    ADMIN_ADD_COURSE_FAIL, ADMIN_ADD_DIVISION_FAIL, ADMIN_ADDED_DIVISION,
    ADMIN_ADDING_COURSE, ADMIN_ADDING_DIVISION,
    ADMIN_BAN_USER_FAIL,
    ADMIN_BANNED_USER,
    ADMIN_BANNING_USER, ADMIN_DELETE_COMMENT_FAIL, ADMIN_DELETE_COURSE_FAIL, ADMIN_DELETE_DIVISION_FAIL,
    ADMIN_DELETE_DOCUMENT_FAIL,
    ADMIN_DELETED_COMMENT, ADMIN_DELETED_COURSE, ADMIN_DELETED_DIVISION,
    ADMIN_DELETED_DOCUMENT,
    ADMIN_DELETING_COMMENT, ADMIN_DELETING_COURSE, ADMIN_DELETING_DIVISION, ADMIN_DELETING_DOCUMENT,
    ADMIN_FETCH_DIVISIONS_FAIL,
    ADMIN_FETCH_USERS_FAIL,
    ADMIN_FETCHED_DIVISIONS,
    ADMIN_FETCHED_DOCUMENTS,
    ADMIN_FETCHED_USERS,
    ADMIN_FETCHING_DIVISIONS,
    ADMIN_FETCHING_DOCUMENTS,
    ADMIN_FETCHING_USERS, ADMIN_MODIFIED_ROLE, ADMIN_MODIFY_ROLE_FAIL, ADMIN_MODIFYING_ROLE, ADMIN_TOGGLE_MODAL_COURSE,
    ADMIN_TOGGLE_MODAL_DIVISION,
    ADMIN_TOGGLE_MODAL_USER,
    ADMIN_TOGGLE_REFRESH, ADMIN_TOGGLE_REFRESH_COMMENTS, ADMIN_TOGGLE_REFRESH_COURSES, ADMIN_TOGGLE_REFRESH_DIVISIONS,
    ADMIN_TOGGLE_REFRESH_DOCUMENTS,
    ADMIN_UNBAN_USER_FAIL,
    ADMIN_UNBANNED_USER,
    ADMIN_UNBANNING_USER,
    ADMIN_ADDED_COURSE
} from "../../constants";
import {divisionFetched} from "../../components/Navbar/action";

export function fetchingUsers() {
    return {
        type: ADMIN_FETCHING_USERS,
        payload: {},
    };
}

export function fetchedUsers(users) {
    return {
        type: ADMIN_FETCHED_USERS,
        payload: {
            users,
        }
    };
}

export function fetchUsersFail() {
    return {
        type: ADMIN_FETCH_USERS_FAIL,
        payload: {}
    }
}

export function fetchUsers(users = null) {
    return (dispatch) => {
        dispatch(fetchingUsers());
        if(users === null) {
            return callApi('user', 'get', {}).then((response) => {
                dispatch(fetchedUsers(response.data.users));
            }).catch(() => {
                dispatch(fetchUsersFail());
            });
        }
        return dispatch(fetchedUsers(users));
    };
}

export function fetchingDivisions() {
    return {
        type: ADMIN_FETCHING_DIVISIONS,
        payload: {},
    };
}

export function fetchedDivisions(divisions) {
    return {
        type: ADMIN_FETCHED_DIVISIONS,
        payload: {
            divisions,
        }
    };
}

export function fetchDivisionsFail() {
    return {
        type: ADMIN_FETCH_DIVISIONS_FAIL,
        payload: {}
    }
}

export function fetchDivisions(divisions = null) {
    return (dispatch) => {
        dispatch(fetchingDivisions());
        if(divisions === null) {
            return callApi('division', 'get', {}).then((response) => {
                dispatch(fetchedDivisions(response.data.divisions));
                dispatch(divisionFetched(response.data.divisions.divisions));
            }).catch(() => {
                dispatch(fetchDivisionsFail());
            });
        }
        dispatch(fetchedDivisions(divisions));
        return dispatch(divisionFetched(divisions));
    };
}

export function fetchingDocuments() {
    return {
        type: ADMIN_FETCHING_DOCUMENTS,
        payload: {},
    };
}

export function fetchedDocuments(documents) {
    return {
        type: ADMIN_FETCHED_DOCUMENTS,
        payload: {
            documents,
        }
    };
}

export function fetchDocumentsFail() {
    return {
        type: ADMIN_FETCH_DIVISIONS_FAIL,
        payload: {}
    }
}

export function fetchDocuments(documents = null) {
    return (dispatch) => {
        dispatch(fetchingDocuments());
        if(documents === null) {
            return callApi('document', 'get', {}).then((response) => {
                dispatch(fetchedDocuments(response.data.documents));
            }).catch(() => {
                dispatch(fetchDocumentsFail());
            })
        }
        return dispatch(fetchedDocuments(documents));
    };
}

export function banningUser() {
    return {
        type: ADMIN_BANNING_USER,
        payload: {},
    };
}

export function bannedUser(user, message) {
    return {
        type: ADMIN_BANNED_USER,
        payload: {
            user,
            message,
        },
    };
}

export function banUserFail(message) {
    return {
        type: ADMIN_BAN_USER_FAIL,
        payload: {
            message,
        },
    };
}

export function banUser(user, users) {
    return (dispatch) => {
        dispatch(banningUser());
        callApi(`user/ban/${user.cuid}`, 'post', { user }).then((response) => {
            dispatch(bannedUser(user, response.data.message));
            users[users.indexOf(user)].logicalDelete = true;
            dispatch(fetchUsers(users));
        }).catch((error) => {
            dispatch(banUserFail(error.response.data.error))
        });
    };
}

export function toggleRefresh() {
    return {
        type: ADMIN_TOGGLE_REFRESH,
        payload: {},
    };
}

export function toggleRefreshComments() {
    return {
        type: ADMIN_TOGGLE_REFRESH_COMMENTS,
        payload: {},
    };
}

export function toggleRefreshDocuments() {
    return {
        type: ADMIN_TOGGLE_REFRESH_DOCUMENTS,
        payload: {},
    };
}

export function toggleRefreshDivisions() {
    return {
        type: ADMIN_TOGGLE_REFRESH_DIVISIONS,
        payload: {},
    };
}

export function toggleRefreshCourses() {
    return {
        type: ADMIN_TOGGLE_REFRESH_COURSES,
        payload: {},
    };
}

export function unBanningUser() {
    return {
        type: ADMIN_UNBANNING_USER,
        payload: {},
    };
}

export function unBannedUser(user, message) {
    return {
        type: ADMIN_UNBANNED_USER,
        payload: {
            user,
            message,
        },
    };
}

export function unBanUserFail(message) {
    return {
        type: ADMIN_UNBAN_USER_FAIL,
        payload: {
            message,
        },
    };
}

export function unBanUser(user, users) {
    return (dispatch) => {
        dispatch(unBanningUser());
        callApi(`user/unban/${user.cuid}`, 'post', { user }).then((response) => {
            dispatch(unBannedUser(user, response.data.message));
            users[users.indexOf(user)].logicalDelete = false;
            dispatch(fetchUsers(users));
        }).catch((error) => {
            dispatch(unBanUserFail(error.response.data.error))
        });
    };
}

export function toggleModalCourse() {
    return {
        type: ADMIN_TOGGLE_MODAL_COURSE,
        payload: {},
    };
}

export function toggleModalDivision() {
    return {
        type: ADMIN_TOGGLE_MODAL_DIVISION,
        payload: {},
    };
}

export function toggleModalUser(user = {}) {
    return {
        type: ADMIN_TOGGLE_MODAL_USER,
        payload: {
            user,
        },
    };
}

export function modifyingRole() {
    return {
        type: ADMIN_MODIFYING_ROLE,
        payload: {},
    };
}

export function modifiedRole(message, user) {
    return {
        type: ADMIN_MODIFIED_ROLE,
        payload: {
            message,
            user,
        },
    };
}

export function modifyRoleFail(message) {
    return {
        type: ADMIN_MODIFY_ROLE_FAIL,
        payload: {
            message,
        },
    };
}

export function modifyRole(user, role, users) {
    return (dispatch) => {
        dispatch(modifyingRole());
        callApi(`user/update/role/${user.cuid}`, 'post', { role }).then((response) => {
            user.role = role;
            dispatch(modifiedRole(response.data.message, user));
            users[users.indexOf(user)].role = role;
            dispatch(fetchUsers(users));
        }).catch((error) => {
            dispatch(modifyRoleFail(error.response.data.error))
        });
    };
}

export function deletingComment() {
    return {
        type: ADMIN_DELETING_COMMENT,
        payload: {},
    };
}

export function deleteCommentFail(message) {
    return {
        type: ADMIN_DELETE_COMMENT_FAIL,
        payload: {
            message,
        }
    };
}

export function deletedComment(comment) {
    return {
        type: ADMIN_DELETED_COMMENT,
        payload: {
            comment,
        }
    }
}

export function deleteComment(comment, document, documents) {
    return (dispatch) => {
          dispatch(deletingComment());
          callApi(`document/comment/${document.cuid}`, 'delete', { comment }).then(() => {
              dispatch(deletedComment(comment));
              documents[documents.indexOf(document)]
                  .comments[documents[documents.indexOf(document)].comments.indexOf(comment)].logicalDelete = true;
              dispatch(fetchDocuments(documents));
          }).catch((error) => {
              dispatch(deleteCommentFail(error.response.data.error));
          });
    };
}

export function deletingDocument() {
    return {
        type: ADMIN_DELETING_DOCUMENT,
        payload: {},
    };
}

export function deleteDocumentFail(message) {
    return {
        type: ADMIN_DELETE_DOCUMENT_FAIL,
        payload: {
            message,
        }
    };
}

export function deletedDocument(document) {
    return {
        type: ADMIN_DELETED_DOCUMENT,
        payload: {
            document,
        }
    }
}

export function deleteDocument(document, documents) {
    return (dispatch) => {
        dispatch(deletingDocument());
        callApi(`document/${document.cuid}`, 'delete', {} ).then(() => {
            dispatch(deletedDocument(document));
            documents[documents.indexOf(document)].logicalDelete = true;
                dispatch(fetchDocuments(documents));
        }).catch((error) => {
            dispatch(deleteDocumentFail(error.response.data.error));
        });
    };
}

export function deletingDivision() {
    return {
        type: ADMIN_DELETING_DIVISION,
        payload: {},
    };
}

export function deleteDivisionFail(message) {
    return {
        type: ADMIN_DELETE_DIVISION_FAIL,
        payload: {
            message,
        }
    };
}

export function deletedDivision(division) {
    return {
        type: ADMIN_DELETED_DIVISION,
        payload: {
            division,
        }
    }
}

export function deleteDivision(division, divisions) {
    return (dispatch) => {
        dispatch(deletingDivision());
        callApi(`division/${division.cuid}`, 'delete', {} ).then(() => {
            dispatch(deletedDivision(division));
            divisions[divisions.indexOf(division)].logicalDelete = true;
            dispatch(fetchDivisions(divisions));
            dispatch(divisionFetched(divisions));
        }).catch((error) => {
            dispatch(deleteDivisionFail(error.response.data.error));
        });
    };
}

export function deletingCourse() {
    return {
        type: ADMIN_DELETING_COURSE,
        payload: {},
    };
}

export function deleteCourseFail(message) {
    return {
        type: ADMIN_DELETE_COURSE_FAIL,
        payload: {
            message,
        }
    };
}

export function deletedCourse(course) {
    return {
        type: ADMIN_DELETED_COURSE,
        payload: {
            course,
        }
    }
}

export function deleteCourse(course, division, divisions) {
    return (dispatch) => {
        dispatch(deletingCourse());
        callApi(`division/course/${division.cuid}`, 'delete', { course } ).then(() => {
            dispatch(deletedCourse(course));
            divisions[divisions.indexOf(division)].
                courses[divisions[divisions.indexOf(division)].courses.indexOf(course)].logicalDelete = true;
            dispatch(fetchDivisions(divisions));
            dispatch(divisionFetched(divisions));
        }).catch((error) => {
            dispatch(deleteCourseFail(error.response.data.error));
        });
    };
}

export function addingCourse() {
    return {
        type: ADMIN_ADDING_COURSE,
        payload: {},
    };
}

export function addCourseFail(message) {
    return {
        type: ADMIN_ADD_COURSE_FAIL,
        payload: {
            message,
        }
    };
}

export function addedCourse(course) {
    return {
        type: ADMIN_ADDED_COURSE,
        payload: {
            course,
        }
    }
}

export function addCourse(course, division, divisions) {
    return (dispatch) => {
        dispatch(addingCourse());
        callApi(`division/course/${division}`, 'post', { course } ).then((response) => {
            dispatch(addedCourse(course));
            divisions.filter((div) => div.cuid === division)[0].courses.push(response.data.course);
            dispatch(fetchDivisions(divisions));
            dispatch(divisionFetched(divisions));
            dispatch(toggleModalCourse());
        }).catch((error) => {
            dispatch(addCourseFail(error.response.data.error));
        });
    };
}

export function addingDivision() {
    return {
        type: ADMIN_ADDING_DIVISION,
        payload: {},
    };
}

export function addDivisionFail(message) {
    return {
        type: ADMIN_ADD_DIVISION_FAIL,
        payload: {
            message,
        }
    };
}

export function addedDivision(division) {
    return {
        type: ADMIN_ADDED_DIVISION,
        payload: {
            division,
        }
    }
}

export function addDivision(division, divisions) {
    return (dispatch) => {
        dispatch(addingDivision());
        callApi(`division/`, 'post', { division } ).then((response) => {
            dispatch(addedDivision(division));
            divisions.push(response.data.division);
            dispatch(fetchDivisions(divisions));
            dispatch(toggleModalDivision());
        }).catch((error) => {
            dispatch(addDivisionFail(error.response.data.error));
        });
    };
}