import React from 'react'
import { formatTimestamp } from '../AppManager';

export default function Temperature({ current }) {
    const [temp, setTemp] = React.useState(0);

    React.useState(() => {
        setTimeout(() => {
            setTemp(current.Temperature);
        }, 500);
    }, []);

    React.useEffect(() => {
        const config = { minTemp: 0, maxTemp: 100 };
        const temperature = document.getElementById("temperature");
        temperature.style.height = (temp - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
        temperature.dataset.value = temp + "°C";
    }, [temp]);

    return (
        <div id="wrapper">	
            <div id="thermometer">
                <div id="temperature" style={{height: 0}} data-value="0°C"></div>
                <div id="graduations"></div>
            </div>
            <div className='data-label'>
                <span>
                    <strong>Temperture:</strong>
                    {temp}°C
                </span>
                <span>
                    <strong>Time Taken:</strong>
                    {formatTimestamp(current.Timestamp)}
                </span>
            </div>
        </div>
    )
}
