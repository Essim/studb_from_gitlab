import {DOC_PREVIEWED} from "../../constants";

export function actionPreviewFile(cuid, selected_file) {
    return {
        type: DOC_PREVIEWED,
        payload : {
            cuid,
            selected_file,
        }
    };
}
export function selectFilePreviewed(document_cuid, file) {
    return (dispatch) => {
        dispatch(actionPreviewFile(document_cuid, file));
    }
}