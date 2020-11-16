import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
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
  id?: number;
}

const source = 'https://ru_monuments.toolforge.org/wikivoyage.php?id=';

const Sidebar = () => {
  const {
    sidebarIsOpen,
    monument,
    onClose
  }: SidebarPropsInterface = useContext(SidebarContext);

  if (!sidebarIsOpen || !monument) return null;

  const address = [monument.adm2, monument.adm3, monument.address].reduce((acc, item, index) => {
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

      <div className={styles.info}>
        <svg width="18" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.9 4C1.9 2.84 2.84 1.9 4 1.9H8V0H4C1.79 0 0 1.79 0 4C0 6.21 1.79 8 4 8H8V6.1H4C2.84 6.1 1.9 5.16 1.9 4ZM14 0H10V1.9H14C15.16 1.9 16.1 2.84 16.1 4C16.1 5.16 15.16 6.1 14 6.1H10V8H14C16.21 8 18 6.21 18 4C18 1.79 16.21 0 14 0ZM6 5H12V3H6V5Z" fill="#000"/>
        </svg>

        <a href={`${source}${monument.id}`} target="_blank" rel="noopener noreferrer" className={styles.text}><span>Доп.информация</span></a>
      </div>

      {address && (
        <div className={styles.info}>
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 6.95C3 3.6605 5.68286 1 9 1C12.3171 1 15 3.6605 15 6.95C15 11.4125 9 18 9 18C9 18 3 11.4125 3 6.95ZM9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z" fill="#000" opacity="0.38"/>
          </svg>

          <div className={styles.text}>{address}</div>
        </div>
      )}

      {monument.image && (
        <FullInfo image={monument.image} />
      )}
    </section>
  )
}

export default Sidebar;
