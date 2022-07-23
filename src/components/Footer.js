import React from 'react'
import "./Footer.css";
import CurrentTrack from "./CurrentTrack";
import PLayerControls from './PLayerControls';
import Volume from './Volume';

const Footer = () => {
  return (
    <div className='footer'>
  
    <CurrentTrack />
   <PLayerControls/>
   <Volume />
    </div>
  )
}

export default Footer