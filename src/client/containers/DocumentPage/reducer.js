import {
    DOCUMENT_CHANGE_VERSION,
} from '../../constants';

const INITIAL_STATE = {
    versionCuid : "",
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case DOCUMENT_CHANGE_VERSION:
            return {
                ...state,
                versionCuid : action.payload,
            };
        default:
            return state;
    }
}
