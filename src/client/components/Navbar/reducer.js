import {
    MENU_DIVISION_FETCH_FAILED, MENU_DIVISION_FETCHED,
    MENU_FETCHING_DIVISIONS
} from "../../constants";

const initialState = {
    loading: false,
    error: undefined,
    divisions: [],
    user: {},
};

export default (state = initialState, action) => {

  switch (action.type) {
        case MENU_FETCHING_DIVISIONS:
            return {
                ...state,
                loading: true
            };
        case MENU_DIVISION_FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MENU_DIVISION_FETCHED:
            return {
                ...state,
                loading: false,
                divisions: action.payload
            };
        default:
            return state;
  }

}

export const getDivision = (divisions, division_cuid) => {
   if (!divisions)
       return;

   return divisions.find(d => d.cuid === division_cuid);
};

export const getCourse = (divisions, division_cuid, course_cuid) => {
    const division = getDivision(divisions, division_cuid);

    if (!division)
        return;

    return division.courses.find(c => c.cuid === course_cuid);
};