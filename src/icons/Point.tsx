import React from 'react';

const Point = ({ isActive }: { isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <circle
      cx="12"
      cy="12"
      r={isActive ? '8' : '7'}
      fill={isActive ? '#e33201' : '#6c2c04'}
      stroke="#fff"
      strokeWidth={isActive ? '2.2' : '2'}
    />
  </svg>
);

export default Point;
