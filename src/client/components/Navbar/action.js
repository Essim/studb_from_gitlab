import fetch from 'isomorphic-fetch';
import {MENU_DIVISION_FETCH_FAILED, MENU_DIVISION_FETCHED, MENU_FETCHING_DIVISIONS} from "../../constants";
import callApi from "../../util/apiCaller";

export function fetchingDivisions() {
    return {
        type: MENU_FETCHING_DIVISIONS,
    };
}


export function divisionFetched(data) {
    return {
        type: MENU_DIVISION_FETCHED,
        payload: data.map(mapCoursesToGrades),
    };
}

export function divisionFetchFailed(error) {
    return {
        type: MENU_DIVISION_FETCH_FAILED,
        payload: error,
    };
}

export const mapCoursesToGrades = (division) => {
    const courses = division.courses;
    division.grades = [];

    courses.forEach((course) => {
        if (typeof division.grades[course.grade] === 'undefined') {
            division.grades[course.grade] = {
                name: course.grade + division.acronym,
                grade: course.grade,
                courses: [],
            };
        }
        division.grades[course.grade].courses.push(course);
    });

    return division;
};

export function fetchDivision() {
    return (dispatch) => {
        dispatch(fetchingDivisions());


        return callApi('division')
            .then((response) => {
                const divisions = response.data.divisions;

                return dispatch(divisionFetched(divisions))
            })
        .catch(error => {
            return dispatch(divisionFetchFailed(error))
        })
    }
}
