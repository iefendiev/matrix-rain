import React from 'react';
import RainStream from './RainStream';
const MatrixRain = () => {
  const streamCount = Math.floor(window.innerWidth / 15);
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
      }}
    >
      {new Array(streamCount).fill().map((_) => (
        <RainStream />
      ))}
    </div>
  );
};

export default MatrixRain;
