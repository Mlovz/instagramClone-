import {combineReducers} from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import homePosts from './postReducer'
import detail from './detailPostReducer'
import explore from './exploreReducer'
import sugges from './suggesReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'

export default combineReducers({
    auth,
    alert,
    profile,
    homePosts,
    detail,
    explore,
    sugges,
    socket,
    notify,
    message
})