import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import MonumentInterface from 'interfaces/Monument';
import getRoute from 'utils/getRoute';

import Point from 'icons/Point';

import styles from './MarkerButton.module.scss';

interface MarkerButtonProps {
  item: MonumentInterface;
}

const MarkerButton: FC<MarkerButtonProps> = ({ item }) => {
  const params: {
    id?: string,
    lat: string,
    lon: string
  } = useParams();
  const isActive = params?.id === item.id;
  const history = useHistory();
  const { lat, lon } = params;

  const handleMarkerClick = () => {
    history.push(getRoute({ lat, lon, id: item.id }));
  };

  return (
    <>
      <button type="button" className={styles.button} onClick={handleMarkerClick}>
        <Point isActive={isActive} />
      </button>
    </>
  );
};

export default MarkerButton;
