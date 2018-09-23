import {
    DOCUMENT_CHANGE_VERSION,
} from '../../constants';


export function documentChangeVersion(cuidDoc) {
    return {
        type: DOCUMENT_CHANGE_VERSION,
        payload: cuidDoc,
    };
}
