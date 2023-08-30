import React from 'react';
import CountUp from 'react-countup';

const Counter = ({ number }) => {
  return (
    <div>
      <CountUp start={0} end={number} duration={2.5} separator="," />
    </div>
  );
};

export default Counter;
