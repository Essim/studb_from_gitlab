import {FETCHED_FEED, FETCHING_FEED, FETCH_FEED_FAIL, SEARCH_FEED} from "../../constants";
import callApi from "../../util/apiCaller";

export function fetchingFeed(tags) {
    return {
        type: FETCHING_FEED,
        payload: tags,
    };
}

export function fetchedFeed(data) {
    return {
        type: FETCHED_FEED,
        payload: data,
    };
}

export function failedFetchingFeed(error) {
    return {
        type: FETCH_FEED_FAIL,
        payload: error,
    };
}

export function fetchFeed(tags) {
    if (!Array.isArray(tags)) {
        tags = [];
    }

    // Inject ajax
    return (dispatch) => {
        dispatch(fetchingFeed(tags));

        callApi(`document/${tags.join('/')}`)
            .then((response) => {
                dispatch(fetchedFeed(response.data.documents))
            })
            .catch((err) => dispatch(failedFetchingFeed(err)));
    };
}

export function searchFeed(tags) {
    return {
        type: SEARCH_FEED,
        payload: tags,
    };
}
