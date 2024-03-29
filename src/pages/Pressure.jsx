import React from 'react'
import { formatTimestamp } from '../AppManager';

export default function Pressure({ current }) {
  const [pressure, setPressure] = React.useState(false);
  const [value, setValue] = React.useState(0);
  
  React.useEffect(() => {
        setTimeout(() => {
          setPressure(current?.Pressure);
       }, 500);
    }, [current]);

  React.useEffect(() => {
    const interval = 1;
    const time = setInterval(() => {
      if(pressure){
        if (value < parseFloat(pressure)) {
          setValue((prevValue) => prevValue + 1.4);
        } else {
          setValue(parseFloat(pressure));
          clearInterval(time);
        }
      }
    }, interval);

    return () => {
      clearInterval(time);
    };
  }, [pressure, value]);

  return (
    <div className='pressure'>
      <div className="wrapper">
        <div className="container">
          <div className="clock">
            <p><span>{value.toFixed(1)}mPa</span></p>
          </div>
          <ul className="clockline" id="clockline">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className='time-stamp'>Time Taken: {current && formatTimestamp(current?.Timestamp)}</div>
        </div>
      </div>
    </div>
  )
}
