import axios from 'axios';
import {
    UPLOADING_FILES,
    UPLOAD_TOGGLE_MODAL, UPLOAD_FILE, UPLOAD_PROGRESS, UPLOAD_ERROR, UPLOAD_SUCCESS, END_UPLOADING_FILES,
    UPLOAD_STATUS_SUCCESS, UPLOAD_ABORT, UPLOAD_FETCH_TAGS, UPLOAD_TAGS_FETCHED, UPLOAD_FAILED_FETCHING_TAGS,
    UPLOAD_TOGGLE_REVISION_MODAL,
} from '../../constants';
import { fetchFeed } from '../../containers/Feed/action'
import callApi from "../../util/apiCaller";



/* Setting uploading to true */
export function startUploadFiles(upload, files, revisionOf) {
    return {
        type: UPLOADING_FILES,
        payload: {
            upload,
            files,
            revisionOf
        }
    };
}

export function startUpload() {
    return {
        type: UPLOAD_FILE
    }
}

export function failUploading(error) {
    return {
        type: UPLOAD_ERROR,
        payload: error
    };
}

export function fileUploaded(document) {
    return {
        type: UPLOAD_SUCCESS,
        payload: document
    };
}

export function uploadProgress(progress, target) {
    return {
        type: UPLOAD_PROGRESS,
        payload: {
            progress,
            target,
            percent: (Math.round((progress * 100) / target)),
        },
    }
}

/* Displaying upload modal */
export function toggleModal() {
    return {
        type: UPLOAD_TOGGLE_MODAL,
    };
}

export function toggleRevisionModal(document) {
    return {
        type: UPLOAD_TOGGLE_REVISION_MODAL,
        payload: document,
    }
}

export function endUploadFile(success, opt) {
    return {
        type: END_UPLOADING_FILES,
        payload: {
            success,
            opt
        }
    }
}

export function endUploading() {
    return (dispatch, getState) => {
        dispatch(endUploadFile(
            getState().upload.process.status === UPLOAD_STATUS_SUCCESS,
            getState().upload.process.result || getState().upload.process.statusMessage)
        );
    }
}

function uploadAborted(err) {
    return {
        type: UPLOAD_ABORT,
        payload: err,
    }
}

function loadTags() {
    return {
        type: UPLOAD_FETCH_TAGS,
    }
}

function tagsLoaded(tags) {
    return {
        type: UPLOAD_TAGS_FETCHED,
        payload: tags,
    }
}

function failedLoadingTags() {
    return {
        type: UPLOAD_FAILED_FETCHING_TAGS,
    }
}

export function loadUploadTags() {
    return (dispatch) => {
        dispatch(loadTags());

        callApi("tag")
            .then((response) => response.data)
            .then((response) => dispatch(tagsLoaded(response.tags)))
            .catch(() => dispatch(failedLoadingTags()))
    }
}

const CancelToken = axios.CancelToken;
let cancel;

export function abortUpload () {
    cancel ("Upload aborted by user action");
}


export function startUploading(upload, files) {
    return (dispatch, getState) => {
        let totalSize = 0;
        files = files.map((file) => {
            file.offset = totalSize;
            totalSize += file.size;

            return file;
        });

        dispatch(startUploadFiles(upload, files));

        const formData = new FormData();
        formData.append("data", JSON.stringify({
            title: upload.title,
            files: files.map((file) => {
                return {
                    name: file.name,
                    size: file.size,
                    offset: file.offset,
                    type: file.type,
                }
            }),
            totalSize: totalSize,
            multiplePath: files.length > 1,
            description: upload.description,
            division_cuid: upload.division,
            course_cuid: upload.course,
            tags: upload.tags,
            parent_version: (getState().upload.parentDocument ? getState().upload.parentDocument.cuid : undefined)
        }));

        files.forEach((file, key) => {
            if (file.type && file.type === 'directory') {
                file.files.forEach((subFile, subKey) => {
                    formData.append("directory-" + key + "-file" + subKey, subFile);
                })
            } else {
                formData.append("file-" + key, file);
            }
        });

        const config = {
            onUploadProgress: (progressEvent) => {
                dispatch(uploadProgress(progressEvent.loaded, progressEvent.total))
            },
            cancelToken: new CancelToken(function executor (c) {
                cancel = c;
            })
        };

        dispatch(startUpload());

        axios.put("/api/document", formData, config)
            .then((response) => response.data)
            .then((response) => {
                dispatch(fileUploaded(response.document))
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    dispatch(uploadAborted(err));
                } else {
                    dispatch(failUploading(err))
                }
            });
    }
}
