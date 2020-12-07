import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import MonumentInterface from 'interfaces/Monument';
import getRoute from 'utils/getRoute';
import styles from './MarkerButton.module.scss';

interface MarkerButtonProps {
  item: MonumentInterface;
}

const MarkerButton: FC<MarkerButtonProps> = ({ item }) => {
  const params: { id?: string } = useParams();
  const isActive = params?.id === item.id;
  const history = useHistory();

  const handleMarkerClick = () => {
    history.push(getRoute({ lat: item.lat, lon: item.lon, id: item.id }));
  };

  return (
    <>
      <button type="button" className={styles.button} onClick={handleMarkerClick}>
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
      </button>
    </>
  );
};

export default MarkerButton;
