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
    UPDATING__MY_GRADES,
    UPDATED_MY_GRADES,
    UPDATE_MY_GRADES_FAIL,
    SET_GRADES,
    SET_USER_GRADES,
    TOGGLE_CHANGE_PASSWORD,
    UPDATED_MY_PASSWORD,
    UPDATE_MY_PASSWORD_FAIL,
    UPDATING__MY_PASSWORD
} from '../../constants';

import callApi from '../../util/apiCaller';


export function updatingMyDivision() {
    return {
        type: UPDATING__MY_DIVISION,
        payload: {},
    };
}

export function updatedMyDivision(division) {
    return {
        type: UPDATED_MY_DIVISION,
        payload : {
            division,
        }
    };
}

export function updateMyDivisionFail() {
    return {
        type: UPDATE_MY_DIVISION_FAIL,
        payload : {}
    }
}

export function updateDivision(user, division) {
    return (dispatch) => {
        dispatch(updatingMyDivision());
        callApi(`user/update/division/${user.cuid}`, 'patch', { division }).then(() => {
            user.division = division;
            dispatch(updatedMyDivision(division));
            dispatch(myDivision(division));
        }).catch(() => {
            dispatch(updateMyDivisionFail());
        });
    }
}

export function fetchingMyDivision() {
    return {
        type: FETCHING_MY_DIVISION,
        payload: {},
    };
}

export function fetchedMyDivision(division) {
    return {
        type: FETCHED_MY_DIVISION,
        payload : {
            division,
        }
    };
}

export function fetchMyDivisionFail() {
    return {
        type: FETCH_MY_DIVISION_FAIL,
        payload : {}
    }
}

export function myDivision(divisionCuid) {
    return (dispatch) => {
        dispatch(fetchingMyDivision());
        callApi(`division/${divisionCuid}`, 'get', {}).then((response) => {
            dispatch(fetchedMyDivision(response.data.division));
        }).catch(() => {
            dispatch(fetchMyDivisionFail());
        });
    }
}

export function fetchingDivisions() {
    return {
        type: FETCHING__DIVISIONS,
        payload: {},
    };
}

export function fetchedDivisions(divisions) {
    return {
        type: FETCHED_DIVISIONS,
        payload : {
            divisions,
        }
    };
}

export function fetchDivisionsFail() {
    return {
        type: FETCH_DIVISIONS_FAIL,
        payload : {}
    }
}

export function divisions() {
    return (dispatch) => {
        dispatch(fetchingDivisions());
        callApi('division', 'get', {}).then((response) => {
            dispatch(fetchedDivisions(response.data.divisions));
        }).catch(() => {
            dispatch(fetchDivisionsFail());
        });
    }
}

export function toggleChangeSection() {
    return {
        type: TOGGLE_CHANGE_SECTION,
        payload: {},
    };
}

export function toggleChangeGrades() {
    return {
        type: TOGGLE_CHANGE_GRADES,
        payload: {},
    };
}

export function toggleChangePassword() {
    return {
        type: TOGGLE_CHANGE_PASSWORD,
        payload: {},
    };
}

export function updatingMyGrades() {
    return {
        type: UPDATING__MY_GRADES,
        payload: {},
    };
}

export function updatedMyGrades(grades) {
    return {
        type: UPDATED_MY_GRADES,
        payload : {
            grades,
        }
    };
}

export function updateMyGradesFail(response) {
    return {
        type: UPDATE_MY_GRADES_FAIL,
        payload : {
            message: response.response.data.error,
        }
    }
}

export function updateGrades(user, grades) {
    return (dispatch) => {
        dispatch(updatingMyGrades());
        const temp = grades.map((grade) => {
            return grade.value;
        });
        temp.sort();
        callApi(`user/update/grades/${user.cuid}`, 'patch', { grades: temp }).then(() => {
            user.grades = temp;
            dispatch(updatedMyGrades(temp));
        }).catch((error) => {
            dispatch(updateMyGradesFail(error));
        });
    }
}

export function setGrades(grades) {
    return {
        type: SET_GRADES,
        payload: {
            grades,
        }
    };
}

export function setUserGrades(grades) {
    return {
        type: SET_USER_GRADES,
        payload: {
            grades,
        }
    };
}

export function updatingMyPassword() {
    return {
        type: UPDATING__MY_PASSWORD,
        payload: {},
    };
}

export function updatedMyPassword() {
    return {
        type: UPDATED_MY_PASSWORD,
        payload : {}
    };
}

export function updateMyPasswordFail(response) {
    return {
        type: UPDATE_MY_PASSWORD_FAIL,
        payload : {
            message: response.response.data.error,
        }
    }
}

export function updatePassword(user, oldPassword, newPassword) {
    return (dispatch) => {
        dispatch(updatingMyPassword());
        callApi(`user/update/password/${user.cuid}`, 'patch', { oldPassword, newPassword }).then(() => {
            dispatch(updatedMyPassword());
        }).catch((error) => {
            dispatch(updateMyPasswordFail(error));
        });
    }
}
