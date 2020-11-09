import React, { useState, useEffect } from 'react';
import X2JS from 'x2js';

import { FileInterface } from 'interfaces/FullInfo';

import styles from './FullInfo.module.scss';

const IMAGE_RESOURCE = '/_api/ru_monument_image?image=';
const x2js = new X2JS();

const FullInfo = ({ image }: { image?: string }) => {
  const [loading, setLoading] = useState(false);
  const [licenses, setLicenses] = useState('');
  const [file, setFile] = useState<FileInterface | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setLicenses('');
      setFile(undefined);
      setCategories([]);

      try {
        const response = await fetch(
          IMAGE_RESOURCE + image,
        );

        const text: string = await response.text();
        const info = x2js.xml2js(text).response;
        
        if (info?.licenses?.license?.name) {
          setLicenses(info.licenses.license.name);
        }

        if (info?.file) {
          setFile(info.file);
        }

        if (info?.categories?.category) {
          const categoriesArray = Array.isArray(info.categories.category)
            ? info.categories.category
            : [info.categories.category]
          setCategories(categoriesArray);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, [image]);

  return (
    <div className={styles.container}>
      {loading && ('Загрузка...')}

      {file && file.urls && (
        <>
          <img src={file.urls.file} alt={file.name || 'description'} width="320" />
          
          <div className={styles.attributes}>

            {licenses && (
              <span dangerouslySetInnerHTML={{ __html: licenses }} className={styles.licenses} />
            )}

            <span dangerouslySetInnerHTML={{ __html: file.author + ',' }} className={styles.author} />

            <span dangerouslySetInnerHTML={{ __html: file.date }} />
            
          </div>
        </>
      )}
    </div>
  )
}

export default FullInfo;
