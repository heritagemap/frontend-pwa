import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from 'contexts/sidebarContext';

import FullInfo from 'components/FullInfo';

import styles from './Sidebar.module.scss';

interface SidebarPropsInterface {
  sidebarIsOpen?: boolean;
  monument?: {
    id: number;
    image?: string;
    adm2?: string;
    adm3?: string;
    address?: string;
    name?: string;
    source?: string;
  };
  onClose?: () => void;
}

interface InfoInterface {
  year: string;
  description: string;
  author: string;
}

const source = 'https://ru_monuments.toolforge.org/wikivoyage.php?id=';
const RESOURCE = '/_api/heritage_info';

const Sidebar = () => {
  const {
    sidebarIsOpen,
    monument,
    onClose,
  }: SidebarPropsInterface = useContext(SidebarContext);

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<InfoInterface | undefined>(undefined);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setInfo(undefined);

      try {
        const response = await fetch(
          // @ts-ignore
          RESOURCE + '?id=' + monument.id,
        );

        const text: string = await response.text();

        const info: InfoInterface = JSON.parse(text);

        console.log(info)

        setInfo(info);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (monument && monument.id) {
      fetchInfo();
    }
  }, [monument]);

  if (!sidebarIsOpen || !monument) return null;

  const address = [monument.adm2, monument.adm2 !== monument.adm3 ? monument.adm3 : '', monument.address].reduce((acc, item, index) => {
    if (!item) return acc;
    if (acc === '') return item;
    return acc + `, ${item}`;
  }, '');

  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>{monument.name}</h1>

        <button onClick={onClose} className={styles.close}>
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#000" />
          </svg>
        </button>
      </div>

      {info?.year && (
        <time>{info.year}</time>
      )}

      {info?.description && (
        <p>{info?.description}</p>
      )}

      {info?.author && (
        <p>{info?.author}</p>
      )}

      <div className={styles.info}>
        <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.925 9C2.925 7.7175 3.9675 6.675 5.25 6.675H8.25V5.25H5.25C3.18 5.25 1.5 6.93 1.5 9C1.5 11.07 3.18 12.75 5.25 12.75H8.25V11.325H5.25C3.9675 11.325 2.925 10.2825 2.925 9ZM6 9.75H12V8.25H6V9.75ZM12.75 5.25H9.75V6.675H12.75C14.0325 6.675 15.075 7.7175 15.075 9C15.075 10.2825 14.0325 11.325 12.75 11.325H9.75V12.75H12.75C14.82 12.75 16.5 11.07 16.5 9C16.5 6.93 14.82 5.25 12.75 5.25Z" fill="#000"/>
        </svg>

        <a href={`${source}${monument.id}`} target="_blank" rel="noopener noreferrer" className={styles.text}><span>Доп.информация</span></a>
      </div>

      {address && (
        <div className={styles.info}>
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM9 8.625C7.965 8.625 7.125 7.785 7.125 6.75C7.125 5.715 7.965 4.875 9 4.875C10.035 4.875 10.875 5.715 10.875 6.75C10.875 7.785 10.035 8.625 9 8.625Z" fill="#000"/>
          </svg>


          <div className={styles.text}>{address}</div>
        </div>
      )}

      {monument.image && (
        <FullInfo id={monument.id} image={monument.image} />
      )}

      <div className={styles.license}>
        Информация об объектах взята из {}
        <a
          href="https://ru.wikivoyage.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Викигида
        </a>
        <br />
        Эти данные доступны по лицензии {}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/deed.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC-By-SA 3.0
        </a>
      </div>
    </section>
  )
}

export default Sidebar;
