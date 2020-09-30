import React, { useState, useEffect } from 'react';
import X2JS from 'x2js';

import { FileInterface } from 'interfaces/FullInfo';

import styles from './FullInfo.module.scss';

const IMAGE_RESOURCE = '/_api/ru_monument_image?image=';
const x2js = new X2JS();

const FullInfo = ({ image }: { image?: string }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<FileInterface | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setDescription('');
      setFile(undefined);
      setCategories([]);

      try {
        const response = await fetch(
          IMAGE_RESOURCE + image,
        );

        const text: string = await response.text();
        const info = x2js.xml2js(text).response;

        if (info?.description?.language?.__text) {
          setDescription(info.description.language.__text);
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

      {description && (
        <div dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />
      )}

      {file && file.urls && (
        <>
          <img src={file.urls.file} alt={file.name || 'description'} width="320" />

          <div dangerouslySetInnerHTML={{ __html: 'Автор: ' + file.author }} />

          <div dangerouslySetInnerHTML={{ __html: file.date }} />
        </>
      )}

      {categories.map(item => (
        <div className={styles.tag} key={item}>{item}</div>
      ))}
    </div>
  )
}

export default FullInfo;
