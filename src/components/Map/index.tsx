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
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
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
        onViewportChange={(viewport: any) => this.setState({viewport})}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Geocoder mapRef={this.mapRef} mapboxApiAccessToken={ACCESS_TOKEN} />
        <div className={styles.controls}>
          <GeolocateControl
            style={{ marginBottom: '10px' }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl/>
        </div>
      </MapGL>
    );
  }
}

export default MyMap;
