import React , {useEffect} from 'react';
import "./Sidebar.css";
import axios from "axios";
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useStateProvider} from "../utils/StateProvider"

const Sidebar = () => {
  const [{token , playlists} ,dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists" ,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const {items} = response.data;
      const playlists = items.map (({name, id}) => {
        return {name,id};
      });
      
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      })

    }
    getPlaylistData();
  } , [token,dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({
      type: "SET_PLAYLIST_ID",
      selectedPlaylistId: selectedPlaylistId,
    })
  }
  
  return (
    <div className='sidebar'>
    <img className='sidebar__logo'
    src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" />
   <SidebarOption Icon={HomeIcon} title="Home" />
   <SidebarOption Icon={SearchIcon} title="Search" />
   <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
   <br />
   <strong className='sidebar__title'>PLAYLISTS</strong>
   <hr />

   {
     playlists.map(({name ,id}) => (
       <div onClick={() => changeCurrentPlaylist((id))} >
       <SidebarOption key={id} title={name}  />
       </div >
     ))
   }

    </div>
  )
}

export default Sidebar