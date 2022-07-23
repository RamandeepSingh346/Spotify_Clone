import React, {useEffect} from 'react'
import "./CurrentTrack.css"
import axios from "axios";
import { useStateProvider } from '../utils/StateProvider';


const CurrentTrack = () => {
    const[{token, currentPlaying} ,dispatch] =useStateProvider();

    useEffect(() => {
        const getCurrentTrack =async() => {
          const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          })
          
         
         if(response.data !== "") {
           const {data} = response
             const currentPlaying = {
               item: data.item,
                 id: data.item.id,
                 name: data.item.name,
                 artists: data.item.artists.map((artist) => artist.name),
                 image: data.item.album.images[2].url,
             };
            
             dispatch({
              type: "SET_PLAYING",
              currentPlaying: currentPlaying,
            })
            }else{
              dispatch({
                type: "SET_PLAYING",
                currentPlaying: null,
              })
            }
            
        };
         getCurrentTrack();
         
      }, [dispatch, token]);

  return (
    <div className="footer__left">
    <div className='albumlogo'>
    <img src={currentPlaying?.image} alt="" />
    </div>
   
      <div className="songInfo">
     <h4>{currentPlaying?.name} </h4> 
      <p>{currentPlaying?.artists.join(", ")}</p>
      </div>
     

     </div>
   
  )
}

export default CurrentTrack;