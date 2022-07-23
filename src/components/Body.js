import React,{useEffect} from 'react'
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import "./Body.css";
import Header from './Header';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';

const Body = () => {

const [{token, selectedPlaylistId,selectedPlaylist} ,dispatch] = useStateProvider();

useEffect(() => {
    const getInitialPlaylist = async() =>{
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      const selectedPlaylist = {
        id: response.data.id,
        name:response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        coverImage: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id:track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album:track.album.name,
          context_uri:track.album.uri,
          track_number:track.track_number,
        }))
      }
      
      dispatch({
        type:"SET_PLAYLIST",
        selectedPlaylist:selectedPlaylist,
      })
    }
   getInitialPlaylist()
},[token , dispatch,selectedPlaylistId])

const msToMinutesAndSeconds = (ms) => {
  const minutes =Math.floor(ms/60000);
  const seconds =((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds <10 ? "0" : "") + seconds;
};

const playTrack = async(id, name , artists,image,context_uri,track_number) => {
  const response = await axios.put(
    `https://api.spotify.com/v1/me/player/play`,
    {
      context_uri,
      offset: {
        position: track_number - 1,
      },
      position_ms: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (response.status === 204) {
    const currentPlaying = {
      id,
      name,
      artists,
      image,
    };
    dispatch({ type:'SET_PLAYING', currentPlaying });
    dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
  } else {
    dispatch({ type:'SET_PLAYER_STATE', playerState: true });
  }
}

  return (
      <div className='body'>
    <Header />
    <div className="body__info">
    <img src={selectedPlaylist?.coverImage} alt="CoverImage" />
    <div classsName="body__infoText">
    <strong>PLAYLIST</strong>
    <h2 className='title'>{selectedPlaylist?.name} </h2>
    <p className='description'> {selectedPlaylist?.description}</p>
    </div>
    </div>
  
    <div className='container'  >
    <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                <AccessTimeTwoToneIcon />
                </span>
              </div>
            </div>
     </div>
     </div>
    
    <div className='tracks'>
    {selectedPlaylist?.tracks.map(({
      id,name,artists,image,duration,album,context_uri,track_number,
    },index
    ) => {
      return(
        <div className='tracks__row' key={id} onClick={() => playTrack(id, name , artists,image,context_uri,track_number)} >
        <div className="tracks__col">
        <span>{index + 1}</span>
      </div>
      <div className="tracks__detail">
        <div className="tracks__image">
          <img src={image} alt="track" />
        </div>
        <div className="tracks__info">
          <span className="tracks__name">{name}</span>
          <span>{artists}</span>
        </div>
      </div>
      <div className="tracks__col">
        <span>{album}</span>
      </div>
      <div className="tracks__col">
      <span>{msToMinutesAndSeconds(duration) }</span>
    </div>
      
        </div>
      )
    })
  }
    </div>
    </div>
    )
}

export default Body;