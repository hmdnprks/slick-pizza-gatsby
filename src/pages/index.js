import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}

function HotSlicing() {
  return (
    <div>
      <p>HotSlicing</p>
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The best Pizza in town!</h1>
      <p>Open 11am to 11pm every day</p>
      <div>
        <CurrentlySlicing slicemasters={sliceMasters} />
        <HotSlicing hotSlices={hotSlices} />
      </div>
    </div>
  );
}
