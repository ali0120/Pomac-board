import React from 'react'
//component
import SideMenu from './../../component/Dashboard/SideMenu/SideMenu';
import Header from './../../component/Dashboard/Header/Header';
import Board from './../../component/Board/Board'

//Style
import './DashboardContainer.css'
const DashboardContainer = () => {
    return (
        <>
            <section className="dashboard" >
                <div className='dash_menu'><SideMenu /></div>
                <div className='dash_body'>
                    <Header />
                    <Board />
                </div>
            </section>
        </>
    )
}

export default DashboardContainer
