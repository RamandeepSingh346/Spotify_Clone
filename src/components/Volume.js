import React from 'react'
import axios from 'axios'
import "./Volume.css"
import { useStateProvider } from '../utils/StateProvider'

import {Grid , Slider} from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

const Volume = () => {
    const [{token}] = useStateProvider();
    const setVolume = async (e) => {
    await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
            params: {
                volume_percent: parseInt(e.target.value),
            },
            headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            },
        }
    )
    }
  return (
    <div className='Volume'>

<Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" size="small"  
            onChange={(e)=> setVolume(e)} min={0} max={100} defaultValue={100} />
          </Grid>
        </Grid>  
</div>
)
}

export default Volume;