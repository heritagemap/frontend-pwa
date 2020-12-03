import React from "react";

import { Marker } from "@urbica/react-map-gl";

import styles from "./MyMap.module.scss";

export interface cluster {
  longitude: number;
  latitude: number;
  pointCount: number;
  clusterId: number;
}

interface ClusterMarkerProps extends cluster {
  onClick: (newCluster: cluster) => void;
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
      <div className={styles.cluster} onClick={handleClick}>
        {pointCount}
      </div>
    </Marker>
  );
};

export default ClusterMarker;
