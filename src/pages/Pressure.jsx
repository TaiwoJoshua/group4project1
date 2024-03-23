import React from 'react'
import { formatTimestamp } from '../AppManager';

export default function Pressure({ current }) {
  const [pressure, setPressure] = React.useState(0);

    React.useEffect(() => {
        setTimeout(() => {
          setPressure(current?.Pressure);
        }, 500);
    }, [current]);

  return (
    <div className='pressure'>
        <div role="progressbar" aria-valuenow={pressure.toString()} aria-valuemin="0" aria-valuemax="200" style={{"--value": pressure}}></div>
        <div className='data-label'>
          <span>
            <strong>Pressure:</strong>
            {pressure} HPa
          </span>
          <span>
            <strong>Time Taken:</strong>
            {current ? formatTimestamp(current?.Timestamp) : ""}
          </span>
        </div>
    </div>
  )
}
