import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar} from '@mui/material';
import { useStateProvider } from '../utils/StateProvider';

const Header = () => {
    const [{userInfo}] = useStateProvider();
  return (
    <div className='header'>
    <div className='header__left'>
    <SearchIcon />
    <input type="text" placeholder="Search for Artists, Songs,or podcast" />
    </div>

    <div className='header__right'>
    <Avatar src={userInfo?.images} alt="RS" />
    <h4>{userInfo?.userName}</h4>
    </div>
    </div>
  )
}

export default Header;