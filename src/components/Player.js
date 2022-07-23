import React, {useEffect} from 'react';
import axios from "axios";
import Body from "./Body";
import Sidebar from './Sidebar';
import Footer from './Footer';
import "./Player.css"
import { useStateProvider } from '../utils/StateProvider';

const Player = () => {
  const[{token} ,dispatch] =useStateProvider();
  
  useEffect(() => {
    const getUserInfo =async() => {
      const {data} =await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
     
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        images: data.images[0].url,
      }
     
      dispatch({
        type: "SET_USER",
        userInfo: userInfo,
      })
    };
     getUserInfo();
     
  }, [dispatch, token]);

  return (
    <div className="player">
    <div className="player__body" >
    <Sidebar />
    <Body  />
    </div>

    <Footer />
    </div>
  )
}

export default Player;