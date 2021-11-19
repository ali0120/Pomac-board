import React from 'react';

//Icon
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineCodeSandbox } from "react-icons/ai";
// Style
import './SideMenu.css';

const SideMenu = () => {
    return (
        <React.Fragment>
            <section className="side_menu">
                {/* Logo */}
                <div className="logo">
                    <button type="button" className="btn">
                        <h2>pomac</h2>
                    </button>
                </div>
                {/* Menu List */}
                <ul className="menu_list" id="menu-list">
                    <li>
                        <a href="#" className="active btn">
                            <MdOutlineSpaceDashboard />
                        </a>
                    </li>
                    <li>
                        <a href="#" className=" btn">
                            <AiOutlineCodeSandbox />
                        </a>
                    </li>
                    <li>
                        <a href="#" className=" btn">
                            <AiOutlineCalendar />
                        </a>
                    </li>
                </ul>
            </section>
        </React.Fragment>
    );
};

export default SideMenu;