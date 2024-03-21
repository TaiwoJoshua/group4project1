import React from 'react'

export default function Pressure() {
  return (
    <div className='pressure'>
        <div role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style={{"--value": 67}}></div>
        <div className='data-label'>
          <span>
            <strong>Pressure:</strong>
            67Pa
          </span>
          <span>
            <strong>Time Taken:</strong>
            1985‑09‑25 17:45:30
          </span>
        </div>
    </div>
  )
}
