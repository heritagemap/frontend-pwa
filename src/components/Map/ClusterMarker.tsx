import React from 'react';

import { Marker } from '@urbica/react-map-gl';

import styles from './MyMap.module.scss';

export interface Cluster {
  longitude: number;
  latitude: number;
  pointCount: number;
  clusterId: number;
}

interface ClusterMarkerProps extends Cluster {
  onClick: (newCluster: Cluster) => void;
}

const ClusterMarker = ({
  clusterId,
  longitude,
  latitude,
  pointCount,
  onClick,
}: ClusterMarkerProps) => {
  const handleClick = () => {
    onClick({
      longitude,
      latitude,
      pointCount,
      clusterId,
    });
  };
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <button type="button" className={styles.cluster} onClick={handleClick}>
        {pointCount}
      </button>
    </Marker>
  );
};

export default ClusterMarker;
