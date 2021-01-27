import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

const RedirectWithZoom = () => {
  const params: { lat: string, lon: string, id?: string } = useParams();
  const { lat, lon, id } = params;

  return (
    <Redirect to={`/lat/${lat}/lon/${lon}/zoom/15/${id || ''}`} />
  );
};

export default RedirectWithZoom;
