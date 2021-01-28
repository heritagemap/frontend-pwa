import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { InfoInterface } from 'interfaces/FullInfo';

import { RESOURCE } from 'constants/map';

import styles from './MonumentPage.module.scss';

const MonumentPage = () => {
  const params: { id: string } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoInterface>();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(
          `${RESOURCE}?id=${params.id}`,
        );

        const text: string = await response.text();

        const infoJSON: InfoInterface = JSON.parse(text);
        setInfo(infoJSON);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  });

  if (loading) {
    return (
      <div className={styles.plug}>Heritage Map</div>
    );
  }

  return (
    <Redirect to={`/lat/${info?.lat}/lon/${info?.long}/zoom/12/${params.id}`} />
  );
};

export default MonumentPage;
