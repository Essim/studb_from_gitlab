import {
    DOC_COMMENTED, DOC_PREVIEWED, FETCH_FEED_FAIL, FETCHED_FEED, FETCHING_FEED, OPINION_GIVEN, SEARCH_FEED,
    UPLOAD_SUCCESS
} from '../../constants';

const initialState = {
    documents: [],
    course: undefined,
    tags: [],
    loading: false,
    error: undefined,
    search: [],
};


export default function (state = initialState, action) {

    switch (action.type) {
        case FETCHING_FEED:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case SEARCH_FEED:
            return {
                ...state,
                search: action.payload,
            };
        case FETCHED_FEED:
            return {
                ...state,
                documents: action.payload,
                error: false,
                loading: false,
            };
        case FETCH_FEED_FAIL:
            return {
                ...state,
                loading: false,
                documents: [],
                error: action.payload,
            };
        case DOC_PREVIEWED:
            const documents = state.documents;
            const index = documents.findIndex(d => d.cuid === action.payload.cuid);
            if (index === -1)
                return state;

            documents[index].selected_file=action.payload.selected_file;

            return {
                ...state,
                documents,
            };
        // A document is updated ?
        case UPLOAD_SUCCESS:
            state.documents.push(action.payload);
            return { ...state };
        case DOC_COMMENTED:
        case OPINION_GIVEN:
            const documentsBis = state.documents;
            const indexBis = documentsBis.findIndex(d => d.cuid === action.payload.cuid);

            if (indexBis === -1)
                return state;

            documentsBis[indexBis] = action.payload;

            return {
                ...state,
                documents: documentsBis,
            };
        default:
            return state;
    }
}
