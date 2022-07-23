import React from 'react'
import axios from "axios";
import "./PlayerControls.css"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useStateProvider } from '../utils/StateProvider';
const PLayerControls = () => {
    const [{token, playerState} , dispatch] = useStateProvider();
    const changeTrack = async (type) => {
        await axios.post(
          `https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
          }
        );
    
        const response1 = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
              },
            }
          );

         
          if(response1.data !== "") {
            const {data} = response1
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

            const changestate = async () => {
              const state = playerState? "pause" : "play";
                await axios.put(
                `https://api.spotify.com/v1/me/player/${state}`,{},  
                {
                  headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "application/json",
                  },
                }
              );
              dispatch({
                type: "SET_PLAYER_STATE",
                playerState: !playerState,
              })
            }

  return (
    <div className="playerControls">
    <ShuffleIcon className="playerControls__icon"/>
    <SkipPreviousIcon className="playerControls__icon" onClick={() => changeTrack("previous")} />
    {playerState 
        ? <PauseCircleFilledIcon fontSize="large" className="playerControls__icon" onClick={changestate}/> 
        : <PlayCircleFilledIcon fontSize="large" className="playerControls__icon" onClick={changestate} />}
    <SkipNextIcon className="playerControls__icon" onClick={() => changeTrack("next")} />
    <RepeatIcon className="playerControls__icon" />

    </div>
  )
}

export default PLayerControls