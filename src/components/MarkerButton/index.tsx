import React, { FC, useContext } from 'react';
import { SidebarContext } from 'contexts/sidebarContext';
import SidebarContextInterface from 'interfaces/SidebarContext';
import MonumentInterface from 'interfaces/Monument';

import styles from './MarkerButton.module.scss';

interface MarkerButtonProps {
  item: MonumentInterface;
}

const MarkerButton: FC<MarkerButtonProps> = ({ item }) => {
  // @ts-ignore
  const { sidebarIsOpen, setCurrentMonument, onOpen, monument } : SidebarContextInterface | {} = useContext(SidebarContext);
  const isActive = sidebarIsOpen && monument.id === item.id;

  const handleMarkerClick = () => {
    setCurrentMonument(item);
    onOpen();
  }

  return (
    <>
      <button className={styles.button} onClick={handleMarkerClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r={isActive ? "8" : "7"} fill={isActive ? "#e33201" : "#6c2c04"} stroke="#fff" strokeWidth={isActive ? "2.2" : "2"} />
        </svg>
      </button>
    </>
  )
}

export default MarkerButton;
