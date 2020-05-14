import React, { Component, RefObject,  } from 'react';
// @ts-ignore
import MapGL, { GeolocateControl, NavigationControl, InteractiveMap } from 'react-map-gl';
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder';

import styles from './MyMap.module.scss';

const ACCESS_TOKEN ='pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';

class MyMap extends Component {
  state = {
    viewport: {
      latitude: 56.80714671197797,
      longitude: 43.20772047711302,
      zoom: 14,
    },
    searchValue: '',
  };

  mapRef: RefObject<InteractiveMap> = React.createRef();

  render() {
    return (
      // @ts-ignore
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={ACCESS_TOKEN}
        onViewportChange={(viewport: any) => { this.setState({viewport}); console.log(viewport) }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Geocoder
          mapRef={this.mapRef}
          mapboxApiAccessToken={ACCESS_TOKEN}
          inputValue={this.state.searchValue}
          placeholder="Поиск"
          countries="ru"
          language="ru"
          onViewportChange={(viewport: any) => { this.setState({viewport}); console.log(viewport) }}
        />
        <div className={styles.controls}>
          <GeolocateControl
            style={{ marginBottom: '10px' }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl showCompass={false} />
        </div>
      </MapGL>
    );
  }
}

export default MyMap;
