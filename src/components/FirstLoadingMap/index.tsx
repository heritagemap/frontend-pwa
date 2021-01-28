import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { DEFAULT_LAT, DEFAULT_LON, DEFAULT_ZOOM } from 'constants/map';

const DefaultMap = () => {
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    const checkCurrentPosition = () => {
      navigator?.geolocation?.getCurrentPosition((position) => {
        if (
          !position.coords
          || !position.coords.latitude
          || !position.coords.longitude
        ) {
          alert.error('Данные геопозиции недоступны');
        } else {
          history.push(`/lat/${position.coords.latitude}/lon/${position.coords.longitude}/zoom/${DEFAULT_ZOOM}`);
        }
      });
    };

    checkCurrentPosition();
  });

  return (<Redirect to={`/lat/${DEFAULT_LAT}/lon/${DEFAULT_LON}/zoom/${DEFAULT_ZOOM}`} />);
};

export default DefaultMap;
