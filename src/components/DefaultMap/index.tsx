import React from 'react';
import { Redirect } from 'react-router-dom';

import FirstLoadingMap from 'components/FirstLoadingMap';

const DefaultMap = () => {
  const prevPosition = JSON.parse(localStorage.getItem('viewport') || '{}');

  if (prevPosition.latitude && prevPosition.longitude) {
    const { latitude, longitude, zoom } = prevPosition;
    return (
      <Redirect
        to={`/lat/${latitude}/lon/${longitude}/zoom/${zoom}`}
      />
    );
  }

  return (<FirstLoadingMap />);
};

export default DefaultMap;
