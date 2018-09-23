/**
 * SEARCH
 **/
export const UPDATE_TAG_SEARCH = 'UPDATE_TAG_SEARCH';

/**
 * FEED
 **/
export const AVAILABLE_FILTER_OPTIONS = {
    FEED_FILTER_NEWEST: "Nouveau",
    FEED_FILTER_POPULAR: "Populaire",
    FEED_FILTER_PERSONAL: "Mes contributions",
};
export const FETCHING_FEED = '@feed/FETCHING';
export const FETCHED_FEED = '@feed/FETCHED';
export const FETCH_FEED_FAIL = '@feed/FETCH_FAILED';
export const SEARCH_FEED = 'SEARCH_FEED';

/**
 * DOCUMENT
 */
export const DOCUMENT_CHANGE_VERSION = 'DOCUMENT_CHANGE_VERSION';
/**
 * NAVBAR
 **/
export const MENU_FETCHING_DIVISIONS = 'MENU_FETCHING_DIVISIONS';
export const MENU_DIVISION_FETCHED = 'MENU_DIVISION_FETCHED';
export const MENU_DIVISION_FETCH_FAILED = 'MENU_DIVISION_FETCH_FAILED';
/**
 * SIGNIN
 **/
export const FETCHING_SIGNIN = '@auth/FETCHING_SIGNIN';
export const FETCHED_SIGNIN = '@auth/FETCHED_SIGNIN';
export const FETCH_SIGNIN_FAIL = '@auth/FETCH_SIGNIN_FAIL';

export const FETCHING_INIT = '@auth/FETCHING_INIT';
export const FETCH_INIT_FAIL = '@auth/FETCH_INIT_FAIL';

export const FETCHING_LOGOUT = '@auth/FETCHING_LOGOUT';
export const FETCHED_LOGOUT = '@auth/FETCHED_LOGOUT';
export const FETCH_LOGOUT_FAIL = '@auth/FETCH_LOGOUT_FAIL';

export const TOGGLE_MODAL_SIGNIN = '@modal/TOGGLE_MODAL_SIGNIN';
export const LOGOUT = '@auth/LOGOUT';

export const USER_ROLE = 1;
export const TEACHER_ROLE = 2;
export const ADMIN_ROLE = 3;
/**
 * SIGNUP
 **/
export const TOGGLE_MODAL_SIGNUP = '@auth/TOGGLE_MODAL_SIGNUP';
export const START_SIGNUP = '@auth/START_SIGNUP';
export const LOGOUT_SIGNUP = '@auth/LOGOUT_SIGNUP';

export const FETCHING_START_SIGNUP = '@auth/FETCHING_START_SIGNUP';
export const FETCHED_START_SIGNUP = '@auth/FETCHED_START_SIGNUP';
export const FETCH_START_SIGNUP_ERROR = '@auth/FETCH_START_SIGNUP_ERROR';

export const FETCHING_SIGNUP = '@auth/FETCHING_SIGNUP';
export const FETCHED_SIGNUP = '@auth/FETCHED_SIGNUP';
export const FETCH_SIGNUP_ERROR = '@auth/FETCH_SIGNUP_ERROR';

/**
 * Profile
 **/
export const TOGGLE_CHANGE_SECTION ='@profileSettings/TOGGLE_CHANGE_SECTION';
export const TOGGLE_CHANGE_GRADES = '@profileSettings/TOGGLE_CHANGE_GRADES';
export const TOGGLE_CHANGE_PASSWORD = '@profileSettings/TOGGLE_CHANGE_PASSWORD';

export const FETCHING_MY_DIVISION = '@profileSettings/FETCHING_MY_DIVISION';
export const FETCHED_MY_DIVISION = '@profileSettings/FETCHED_MY_DIVISION';
export const FETCH_MY_DIVISION_FAIL = '@profileSettings/FETCH_MY_DIVISION_FAIL';

export const FETCHING__DIVISIONS = '@profileSettings/FETCHING_DIVISIONS';
export const FETCHED_DIVISIONS = '@profileSettings/FETCHED_DIVISIONS';
export const FETCH_DIVISIONS_FAIL = '@profileSettings/FETCH_DIVISIONS_FAIL';

export const UPDATING__MY_DIVISION = '@profileSettings/UPDATING__MY_DIVISION';
export const UPDATED_MY_DIVISION = '@profileSettings/UPDATED_MY_DIVISION';
export const UPDATE_MY_DIVISION_FAIL = '@profileSettings/UPDATE_MY_DIVISION_FAIL';

export const UPDATING__MY_GRADES = '@profileSettings/UPDATING__MY_GRADES';
export const UPDATED_MY_GRADES = '@profileSettings/UPDATED_MY_GRADES';
export const UPDATE_MY_GRADES_FAIL = '@profileSettings/UPDATE_MY_GRADES_FAIL';

export const UPDATING__MY_PASSWORD = '@profileSettings/UPDATING__MY_PASSWORD';
export const UPDATED_MY_PASSWORD = '@profileSettings/UPDATED_MY_PASSWORD';
export const UPDATE_MY_PASSWORD_FAIL = '@profileSettings/UPDATE_MY_PASSWORD_FAIL';

export const SET_GRADES = '@profileSettings/SET_GRADES';
export const SET_USER_GRADES = '@profileSettings/SET_USER_GRADES';

export const FETCHING_USER = '@profile/FETCHING_USER';
export const FETCHED_USER = '@profile/FETCHED_USER';
export const FETCH_USER_FAIL = '@profile/FETCH_USER_FAIL';

export const FETCHING_DOCUMENTS = '@profile/FETCHING_DOCUMENTS';
export const FETCHED_DOCUMENTS = '@profile/FETCHED_DOCUMENTS';
export const FETCH_DOCUMENTS_FAIL = '@profile/FETCH_DOCUMENTS_FAIL';

export const FETCH_CONNECTED_USER = '@profile/FETCH_CONNECTED_USER';

/**
 * UPLOAD
 **/
export const UPLOAD_TOGGLE_MODAL = '@upload/TOGGLE_MODAL';
export const UPLOAD_TOGGLE_REVISION_MODAL = '@upload/TOGGLE_REVISION';

export const UPLOADING_FILES = '@upload/UPLOADING_FILES';
export const END_UPLOADING_FILES = '@upload/END_UPLOADING_FILES';


export const UPLOAD_FETCH_TAGS = '@upload/FETCH_TAGS';
export const UPLOAD_TAGS_FETCHED = '@upload/TAGS_FETCHED';
export const UPLOAD_FAILED_FETCHING_TAGS = '@upload/UPLOAD_FAILED_FETCHING_TAGS';

export const UPLOAD_FILE = '@upload/UPLOAD_FILE';
export const UPLOAD_PROGRESS = '@upload/UPLOAD_PROGRESS';
export const UPLOAD_ERROR = '@upload/UPLOAD_ERROR';
export const UPLOAD_SUCCESS = '@upload/UPLOAD_SUCCESS';
export const UPLOAD_ABORT = '@upload/UPLOAD_ABORT';

/**
 * Opinions
 */

export const OPINION_LIKE    = "like";
export const OPINION_DISLIKE = "dislike";
export const OPINION_REPORT  = "report";

export const GIVING_OPINION = "GIVING_OPINION";
export const OPINION_GIVEN  = "OPINION_GIVEN";
export const FAIL_GIVING_OPINION = "FAIL_GIVING_OPINION";

export const COMMENTING_DOC = "@docs/COMMENTING";
export const DOC_COMMENTED = "@docs/COMMENTED";
export const DOC_PREVIEWED = "@docs/PREVIEWED";
export const FAIL_COMMENTING_DOC = "@docs/FAIL_COMMENTING";

/**
 * Admin
 */

export const ADMIN_FETCHING_USERS = '@admin/FETCHING_USERS';
export const ADMIN_FETCHED_USERS = '@admin/FETCHED_USERS';
export const ADMIN_FETCH_USERS_FAIL = '@admin/FETCH_USERS_FAIL';

export const ADMIN_FETCHING_DIVISIONS = '@admin/FETCHING_DIVISIONS';
export const ADMIN_FETCHED_DIVISIONS = '@admin/FETCHED_DIVISIONS';
export const ADMIN_FETCH_DIVISIONS_FAIL = '@admin/FETCH_DIVISIONS_FAIL';

export const ADMIN_FETCHING_DOCUMENTS = '@admin/FETCHING_DOCUMENTS';
export const ADMIN_FETCHED_DOCUMENTS = '@admin/FETCHED_DOCUMENTS';
export const ADMIN_FETCH_DOCUMENTS_FAIL = '@admin/FETCH_DOCUMENTS_FAIL';

export const ADMIN_BANNING_USER = '@admin/BANNING_USER';
export const ADMIN_BANNED_USER = '@admin/BANNED_USER';
export const ADMIN_BAN_USER_FAIL = '@admin/BAN_USER_FAIL';

export const ADMIN_UNBANNING_USER = '@admin/UNBANNING_USER';
export const ADMIN_UNBANNED_USER = '@admin/UNBANNED_USER';
export const ADMIN_UNBAN_USER_FAIL = '@admin/UNBAN_USER_FAIL';

export const ADMIN_MODIFYING_ROLE = '@admin/MODIFYING_ROLE';
export const ADMIN_MODIFIED_ROLE = '@admin/MODIFIED_ROLE';
export const ADMIN_MODIFY_ROLE_FAIL = '@admin/MODIFY_ROLE_FAIL';

export const ADMIN_DELETING_COMMENT = '@admin/DELETING_COMMENT';
export const ADMIN_DELETED_COMMENT = '@admin/DELETED_COMMENT';
export const ADMIN_DELETE_COMMENT_FAIL = '@admin/DELETE_COMMENT_FAIL';

export const ADMIN_DELETING_DOCUMENT = '@admin/DELETING_DOCUMENT';
export const ADMIN_DELETED_DOCUMENT = '@admin/DELETED_DOCUMENT';
export const ADMIN_DELETE_DOCUMENT_FAIL = '@admin/DELETE_DOCUMENT_FAIL';

export const ADMIN_DELETING_DIVISION = '@admin/DELETING_DIVISION';
export const ADMIN_DELETED_DIVISION = '@admin/DELETED_DIVISION';
export const ADMIN_DELETE_DIVISION_FAIL = '@admin/DELETE_DIVISION_FAIL';

export const ADMIN_DELETING_COURSE = '@admin/DELETING_COURSE';
export const ADMIN_DELETED_COURSE = '@admin/DELETED_COURSE';
export const ADMIN_DELETE_COURSE_FAIL = '@admin/DELETE_COURSE_FAIL';

export const ADMIN_ADDING_COURSE = '@admin/ADDING_COURSE';
export const ADMIN_ADDED_COURSE = '@admin/ADDED_COURSE';
export const ADMIN_ADD_COURSE_FAIL = '@admin/ADD_COURSE_FAIL';

export const ADMIN_ADDING_DIVISION = '@admin/ADDING_COURSE';
export const ADMIN_ADDED_DIVISION = '@admin/ADDED_COURSE';
export const ADMIN_ADD_DIVISION_FAIL = '@admin/ADD_DIVISION_FAIL';
export const ADMIN_TOGGLE_REFRESH = '@admin/TOGGLE_REFRESH';

export const ADMIN_TOGGLE_REFRESH_COMMENTS = '@admin/TOGGLE_REFRESH_COMMENTS';
export const ADMIN_TOGGLE_REFRESH_DOCUMENTS = '@admin/TOGGLE_REFRESH_DOCUMENTS';
export const ADMIN_TOGGLE_REFRESH_DIVISIONS = '@admin/TOGGLE_REFRESH_DIVISIONS';
export const ADMIN_TOGGLE_REFRESH_COURSES = '@admin/TOGGLE_REFRESH_COURSES';

export const ADMIN_TOGGLE_MODAL_USER = '@admin/TOGGLE_MODAL_USER';
export const ADMIN_TOGGLE_MODAL_COURSE = '@admin/TOGGLE_MODAL_COURSE';
export const ADMIN_TOGGLE_MODAL_DIVISION = '@admin/TOGGLE_MODAL_DIVISION';



export const UPLOAD_STATUS_WAITING = "waiting";
export const UPLOAD_STATUS_UPLOADING = "uploading";
export const UPLOAD_STATUS_ERROR = "error";
export const UPLOAD_STATUS_ABORTED = "aborted";
export const UPLOAD_STATUS_SUCCESS = "success";
