import React from 'react';
import { FaChartLine, FaTemperatureThreeQuarters, FaCloudRain, FaGauge } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav id='navbar'>
            <h2>Group 4 Project 1</h2>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/chart"}><FaChartLine /> <span>Chart</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/temperature"}><FaTemperatureThreeQuarters /> <span>Temperature</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/humidity"}><FaCloudRain /> <span>Humidity</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/pressure"}><FaGauge /> <span>Pressure</span></NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;