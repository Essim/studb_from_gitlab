import callApi from "../../util/apiCaller";
import {FAIL_GIVING_OPINION, GIVING_OPINION, OPINION_GIVEN, OPINION_LIKE, OPINION_REPORT} from "../../constants";


export function giveOpinion(type, target, user) {
    return {
        type: GIVING_OPINION,
        payload : {
            type,
            target,
            user
        }
    };
}

export function opinionGiven(document) {
    return {
        type: OPINION_GIVEN,
        payload : document
    }
}

export function failedGivingOpinion(err) {
    return {
        type: FAIL_GIVING_OPINION,
        payload: err
    }
}

export function giveDocumentOpinion(type, document_cuid, user) {
    return (dispatch) => {
        dispatch(giveOpinion(type, document_cuid, user));
        // @fixme include user cuid
        callApi("document/like/" + document_cuid, "post", {
            user : {
                cuid: user.cuid,
            },
            opinion: {
                cuid_author: user.cuid,
                name_author: user.pseudo,
                state: type === OPINION_LIKE,
                report: type === OPINION_REPORT,
            }
        }).then((response) => {
            if (response.data.document)
                dispatch(opinionGiven(response.data.document))
        }).catch((err) => {
            dispatch(failedGivingOpinion(err))
        });
    }
}