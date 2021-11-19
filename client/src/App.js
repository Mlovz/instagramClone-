import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Navbar from "./components/navbar/Navbar";
import Spash from "./components/Spash";
import Explore from "./pages/explore";
import Home from './pages/home'
import Login from "./pages/login";
import Post from "./pages/Post";
import Profile from "./pages/profile";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import io from 'socket.io-client'
import {GLOBALTYPES} from './redux/actions/globalTypes'
import SoketClient from "./SoketClient";
import { getNotify } from "./redux/actions/notifyAction";
import Message from "./pages/message";
import MessageID from "./pages/messageID";
import Register from "./pages/register";


function App() {
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state)

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token){
      dispatch(getPosts(auth.token))
      dispatch(getNotify(auth.token))
    }
  },[dispatch, auth.token])
  
  return (
    <div className="app">
      {auth.token && <Navbar/>}
      {auth.refresh_load && <Spash/>}
      {auth.token && <SoketClient/>}
      <Alert/>
      <div style={{paddingTop: !auth.token && '0px'}} className='app__main'>
        <Switch>
          <Route exact path='/' component={auth.token ? Home : Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/profile/:id' component={Profile}/>
          <Route exact path='/post/:id' component={Post}/>
          <Route exact path='/explore' component={Explore}/>
          <Route exact path='/direct' component={Message}/>
          <Route exact path='/direct/:id' component={MessageID}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
