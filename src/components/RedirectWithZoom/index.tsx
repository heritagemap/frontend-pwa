import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { DEFAULT_ZOOM } from 'constants/map';

const RedirectWithZoom = () => {
  const params: { lat: string, lon: string, id?: string } = useParams();
  const { lat, lon, id } = params;

  return (
    <Redirect to={`/lat/${lat}/lon/${lon}/zoom/${DEFAULT_ZOOM}/${id || ''}`} />
  );
};

export default RedirectWithZoom;
