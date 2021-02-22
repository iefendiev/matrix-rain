import React from 'react';
import { useState } from 'react';
import useInterval from '@use-it/interval';

const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;

const getRandChar = () =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const STREAM_MUTATION_ODDS = 0.07;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 35;

const getRandInRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getMutatedStream = (stream) => {
  const newStream = [];
  for (let i = 0; i < stream.length; i++) {
    if (Math.random() < STREAM_MUTATION_ODDS) {
      newStream.push(getRandChar());
    } else {
      newStream.push(stream[i]);
    }
  }
  newStream.push(getRandChar());
  return newStream;
};

const genRandStream = () =>
  new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill()
    .map(getRandChar);
//[empty,empty,empty]
//[undefined,undefined,undefined]
//[b,10,!]

// console.log(genRandStream());

const RainStream = () => {
  // const stream = genRandStream();
  const [stream, setStream] = useState(genRandStream());
  // const [topPadding, setTopPadding] = useState(0);
  const [topPadding, setTopPadding] = useState(stream.length * -50);

  // useInterval does not changes when the component re-renders
  useInterval(() => {
    if (topPadding > window.innerHeight) {
      setTopPadding(stream.length * -50);
    } else {
      setTopPadding(topPadding + 44);
      // setStream((stream) => [...stream.slice(1, stream.length), getRandChar()]);
      setStream(getMutatedStream);
    }
  }, 50);

  return (
    <div
      style={{
        marginTop: topPadding,
        fontFamily: 'matrixFont',
        color: '#20c20e',
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        marginLeft: '-15',
        marginRight: '-20',
        textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
        fontSize: '50px',
      }}
    >
      {/* {'ipekk'.split('').map((char) => ( */}
      {stream.map((char, index) => (
        <a
          style={{
            color: index === stream.length - 1 ? '#fff' : undefined,
            opacity: index < 6 ? 0.1 + index * 0.15 : 1,
            textShadow:
              index === stream.length - 1
                ? '0px 0px 20px rgba(255, 255, 255, 1)'
                : undefined,
            marginTop: '-12',
          }}
        >
          {char}
        </a>
      ))}
    </div>
  );
};

export default RainStream;
