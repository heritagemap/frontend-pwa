import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from 'contexts/sidebarContext';

import { Type } from 'interfaces/FullInfo';
import getStatus from 'utils/getStatus';

import FullInfo from 'components/FullInfo';

import styles from './Sidebar.module.scss';
import getProtegtion from 'utils/getProtegtion';

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
  protection?: 'Ф' | 'Р' | 'М' | 'В';
  type: Type;
  knid: string;
  style?: string;
  wiki?: string;
}

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

  const status = info ? getStatus(info.type, info.knid) : '';
  const protection = info?.protection ? getProtegtion(info.protection) : '';

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
        <p className={styles.mainInfo}>{info.year}</p>
      )}

      {info?.description && (
        <p className={styles.mainInfo}>{info?.description}</p>
      )}

      {info?.style && (
        <p className={styles.mainInfo}>Стиль: {info?.style}</p>
      )}

      {info?.author && (
        <p className={styles.mainInfo}>{info?.author}</p>
      )}

      {info?.wiki && (
        <div className={styles.info}>
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.9 9C1.9 7.84 2.84 6.9 4 6.9H8V5H4C1.79 5 0 6.79 0 9C0 11.21 1.79 13 4 13H8V11.1H4C2.84 11.1 1.9 10.16 1.9 9ZM14 5H10V6.9H14C15.16 6.9 16.1 7.84 16.1 9C16.1 10.16 15.16 11.1 14 11.1H10V13H14C16.21 13 18 11.21 18 9C18 6.79 16.21 5 14 5ZM6 10H12V8H6V10Z" fill="black"/>
          </svg>

          <a href={`https://ru.wikipedia.org/wiki/${info.wiki}`} target="_blank" rel="noopener noreferrer" className={styles.text}><span>Доп.информация</span></a>
        </div>
      )}

      {address && (
        <div className={styles.info}>
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 6.95C3 3.6605 5.68286 1 9 1C12.3171 1 15 3.6605 15 6.95C15 11.4125 9 18 9 18C9 18 3 11.4125 3 6.95ZM9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z" fill="black"/>
          </svg>


          <div className={styles.text}>{address}</div>
        </div>
      )}

      {status && (
        <div className={styles.info}>
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17.03C4.58 17.03 1 13.45 1 9.03003C1 4.61003 4.58 1.03003 9 1.03003C13.42 1.03003 17 4.61003 17 9.03003C17 13.45 13.42 17.03 9 17.03ZM10 5.06003H8V7.06003H10V5.06003ZM10 8.06003H8V13.06H10V8.06003Z" fill="black"/>
          </svg>

      <div className={styles.text}>{status} {protection ? `, ${protection}` : ''}</div>
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
