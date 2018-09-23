import { combineReducers } from "redux";
import signin from '../components/SignIn/reducer';
import signup from '../components/SignUp/reducer';
import divisions from "../components/Navbar/reducer";
import documentFeed from "../containers/Feed/reducer";
import documentPage from "../containers/DocumentPage/reducer";
import upload from "../components/Upload/reducer";
import profile from '../containers/Profile/reducer';
import profileSettings from '../components/ProfileSettingsPage/reducer';
import commenter from "../components/PostComment/reducer";
import admin from '../containers/ZoneAdmin/reducer';


export default combineReducers({
    signin,
    signup,
    divisions,
    documentFeed,
    documentPage,
    upload,
    profile,
    profileSettings,
    commenter,
    admin,
});
