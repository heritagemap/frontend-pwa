import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

import styles from './MyMap.module.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';

function MyMap() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const myMap: Map = new mapboxgl.Map({
      container: 'map_container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [44, 56.32], // NN
      zoom: 15
    });

    myMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      })
    );

    myMap.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      'top-right',
    );

    return () => {
      myMap.remove();
    }
  }, []);

  return (
    <div
      id="map_container"
      className={styles.map}
      ref={mapContainerRef}
    />
  );
}

export default MyMap;
