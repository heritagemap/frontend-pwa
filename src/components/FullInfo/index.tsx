import React, { useState, useEffect } from 'react';
import X2JS from 'x2js';

import styles from './FullInfo.module.scss';

const IMAGE_RESOURCE = '/_api/ru_monument_image?image=';
const x2js = new X2JS();

const FullInfo = ({ image }: { image?: string }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          IMAGE_RESOURCE + image,
        );

        const text = await response.text();
        // @ts-ignore
        const info = x2js.xml2js(text).response;

        setInfo(info);
        console.log(info)
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, [image]);

  return (
    <div className={styles.container}>
      {loading && ('Загрузка...')}
      {/* @ts-ignore */}
      {info && info.file && (
        <>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{ __html: info.description.language.__text }} className={styles.description} />

          {/* @ts-ignore */}
          <img src={info.file.urls.file} alt={info.file.name} width="320" />

          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{ __html: 'Автор: ' + info.file.author }} />

          {/* @ts-ignore */}
          {info.categories.category.map(item => (
            <div className={styles.tag} key={item}>{item}</div>
          ))}
        </>
      )}
    </div>
  )
}

export default FullInfo;
