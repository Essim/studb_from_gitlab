import {COMMENTING_DOC, DOC_COMMENTED, FAIL_COMMENTING_DOC} from "../../constants";

const initialState = {
    loading: false,
    hasError: false,
    error: '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case COMMENTING_DOC:
            return {
                loading: true,
                hasError: false,
                error: '',
            };
        case DOC_COMMENTED:
            return {
                ...state,
                loading: false,
            };
        case FAIL_COMMENTING_DOC:
            return {
                loading: false,
                hasError: false,
                error: action.payload,
            };
        default:
            return state;
    }
}