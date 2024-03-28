import React from 'react';
import { FaChartLine, FaTemperatureThreeQuarters, FaCloudRain, FaGauge } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import logo from '../images/runlogo.png';

function Navbar() {
    return (
        <nav id='navbar'>
            <div>
                <img src={logo} alt="Redeemer's University Logo" />
                <div>
                    <h2>Redeemer's University</h2>
                    <h3>Faculty of Engineering</h3>
                    <h4>Department of Computer Engineering</h4>
                </div>
            </div>
            <h3>CPE 405 - Group 4 Project 1</h3>
            <ul>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/chart"}><FaChartLine /> <span>Chart</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/humidity"}><FaCloudRain /> <span>Humidity</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/pressure"}><FaGauge /> <span>Pressure</span></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? "active" : null} to={"/temperature"}><FaTemperatureThreeQuarters /> <span>Temperature</span></NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;