import React from 'react'
import { MdSearch } from 'react-icons/md'

//image
import avatar from '../../../assets/avatar.png'

//Style 
import './Header.css'
const Header = () => {
    return (
        <React.Fragment>
            <div className="header--component">
                <div className="header--search">
                    <MdSearch/>
                    <input type="text" placeholder='search' autoComplete="off" />
                </div>
                <div className="header--info">
                    <div className="info--name">
                        <h3>Ahmed Ali</h3>
                        <p>Admin</p>
                    </div>
                    <div className="info--pic">
                        <img src={avatar} alt="user"  />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
