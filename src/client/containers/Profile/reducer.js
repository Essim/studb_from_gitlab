import {
    FETCH_CONNECTED_USER,
    FETCHING_USER,
    FETCH_USER_FAIL,
    FETCHED_USER, FETCHING_DOCUMENTS, FETCH_DOCUMENTS_FAIL, FETCHED_DOCUMENTS,
} from "../../constants";

const INITIAL_STATE = {
    isFetchingUser: false,
    isFetchingDocuments: false,
    user : {},
    documents: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case FETCH_CONNECTED_USER:
          return {
              ...state,
              user: action.payload.user,
          };
      case FETCHING_USER:
          return {
              ...state,
              isFetchingUser: true,
          };
      case FETCH_USER_FAIL:
          return {
              ...state,
              isFetchingUser: false,
          };
      case FETCHED_USER:
          return {
              ...state,
              isFetchingUser: false,
              user: action.payload.user,
          };
      case FETCHING_DOCUMENTS:
          return {
              ...state,
              isFetchingDocuments: true,
          };
      case FETCH_DOCUMENTS_FAIL:
          return {
              ...state,
              isFetchingDocuments: false,
          };
      case FETCHED_DOCUMENTS:
          return {
              ...state,
              isFetchingDocuments: false,
              documents: action.payload.documents,
          };
    default:
      return state;
  }
}
