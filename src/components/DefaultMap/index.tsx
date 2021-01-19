import React from 'react';
import { Redirect } from 'react-router-dom';

import FirstLoadingMap from 'components/FirstLoadingMap';

const DefaultMap = () => {
  const prevPosition = JSON.parse(localStorage.getItem('viewport') || '{}');

  if (prevPosition.latitude && prevPosition.longitude) {
    return (<Redirect to={`/lat/${prevPosition.latitude}/lon/${prevPosition.longitude}`} />);
  }

  return (<FirstLoadingMap />);
};

export default DefaultMap;
