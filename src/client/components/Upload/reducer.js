import {
    UPLOADING_FILES, UPLOAD_TOGGLE_MODAL,
    UPLOAD_FILE, UPLOAD_STATUS_WAITING, UPLOAD_STATUS_UPLOADING, UPLOAD_ERROR, UPLOAD_PROGRESS, UPLOAD_SUCCESS,
    UPLOAD_STATUS_SUCCESS, UPLOAD_STATUS_ERROR, END_UPLOADING_FILES, UPLOAD_ABORT, UPLOAD_STATUS_ABORTED,
    UPLOAD_FETCH_TAGS, UPLOAD_TAGS_FETCHED, UPLOAD_FAILED_FETCHING_TAGS, UPLOAD_TOGGLE_REVISION_MODAL,
} from '../../constants';

const initialState = {
    modalOpened: false,
    hasUpload: false,
    parentDocument: undefined,
    upload: {},
    files : [],
    process: {},
    uploading: false,
    tags : []
};

const initialProcessState = {
    status: UPLOAD_STATUS_WAITING,
    statusMessage: '',
    progress: 0,
    target: 0,
    percent: 0,
    result: null
};

export default (state = initialState, action ) => {
    const process = state.process;

    switch (action.type) {
        case UPLOAD_TOGGLE_REVISION_MODAL:
            return {
                ...state,
                modalOpened: !state.modalOpened,
                parentDocument : action.payload
            };
        case UPLOAD_TOGGLE_MODAL:
            return { ...state,
                modalOpened: !state.modalOpened,
                parentDocument: (!state.hasUpload && state.modalOpened) ? undefined : state.parentDocument
            };
        case UPLOAD_FETCH_TAGS:
            return { ...state, tags: [] };
        case UPLOAD_TAGS_FETCHED:
            return { ...state, tags: action.payload };
        case UPLOAD_FAILED_FETCHING_TAGS:
            return { ...state, tags: false };
        /* Sending a post request to the API to upload multiple files */
        case UPLOADING_FILES:
            return {
                ...state,
                hasUpload: true,
                uploading: false,
                upload: action.payload.upload,
                files: action.payload.files,
                process: initialProcessState
            };
        case END_UPLOADING_FILES:
            return initialState;
        case UPLOAD_FILE:
            process.status = UPLOAD_STATUS_UPLOADING;
            process.percent = 0;
            process.progress = 0;
            return { ...state, uploading:true, process };
        case UPLOAD_PROGRESS:
            process.status = UPLOAD_STATUS_UPLOADING;
            process.progress = action.payload.progress;
            process.percent = 0;
            return { ...state, process };
        case UPLOAD_ERROR:
            process.status = UPLOAD_STATUS_ERROR;
            process.statusMessage = action.payload;
            return { ...state, uploading: false, process };
        case UPLOAD_ABORT:
            process.status = UPLOAD_STATUS_ABORTED;
            process.statusMessage = action.payload;
            return { ...state, uploading: false, process };
        case UPLOAD_SUCCESS:
            process.status = UPLOAD_STATUS_SUCCESS;
            process.result = action.payload;
            return { ...state, uploading: false, process };
        default:
            return state;
    }
}


export function formatBytes(bytes,decimals) {
    if(bytes === 0) return '0 Bytes';

    const k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}