import callApi from "../../util/apiCaller";
import {COMMENTING_DOC, DOC_COMMENTED, FAIL_COMMENTING_DOC} from "../../constants";


export function commenting(target, comment) {
    return {
        type: COMMENTING_DOC,
        payload: {
            doc: target,
            comment: comment,
        },
    }
}

export function documentCommented(document) {
    return {
        type: DOC_COMMENTED,
        payload: document,
    }
}

export function failedCommenting(err) {
    return {
        type: FAIL_COMMENTING_DOC,
        payload: err,
    }
}

export function commentDocument (doc_cuid, comment) {
    return (dispatch) => {
        dispatch(commenting(doc_cuid, comment));
        callApi("document/comment/" + doc_cuid, "post", { comment })
            .then((response) => {
                dispatch(documentCommented(response.data.document))
            })
            .catch(err => dispatch(failedCommenting(err)))
    }
}