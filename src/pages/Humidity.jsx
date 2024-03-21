import React from 'react'
import { formatTimestamp } from '../AppManager';

export default function Humidity({ current }) {
  const [humidity, setHumidity] = React.useState(0);

  React.useEffect(() => {
    setHumidity(current.Humidity);
  }, [current]);

  const transform = -1 * ((humidity * (105 - 50) * 0.01) + 50);
  return (
    <div className='humidity'>
        <div role="progressbar" aria-valuenow={humidity} aria-valuemin="0" aria-valuemax="100" style={{"--value": humidity, "--humidity": transform + "%"}}>
          <div className="water-wrap">
            <span className="value">{humidity}%</span>
            <div className="wave"></div>
          </div>
        </div>
        <div className='data-label'>
          <span>
            <strong>Humidity:</strong>
            {humidity}%
          </span>
          <span>
            <strong>Time Taken:</strong>
            {formatTimestamp(current.Timestamp)}
          </span>
        </div>
    </div>
  )
}
