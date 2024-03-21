import React from 'react';
import { FaChartLine, FaTemperatureThreeQuarters, FaCloudRain, FaGauge } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav id='navbar'>
            <h2>Group 4 Project 1</h2>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/chart"}><FaChartLine /> Chart</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/temperature"}><FaTemperatureThreeQuarters />Temperature</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/humidity"}><FaCloudRain /> Humidity</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/pressure"}><FaGauge /> Pressure</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;