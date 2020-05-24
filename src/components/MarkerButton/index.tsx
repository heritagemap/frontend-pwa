import React, { FC, useState } from 'react';
import styles from './MarkerButton.module.scss';
interface MarkerButtonProps {
  item: {
    name: string;
    address: string;
  }
}

const MarkerButton: FC<MarkerButtonProps> = (props) => {
  const [showInfo, toogleShowInfo] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => toogleShowInfo(!showInfo)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.2 384.2" width="25" height="25">
          <path d="M320.1 144c0-70.72-57.28-128-128-128s-128 57.28-128 128 128 216 128 216 128-145.28 128-216zm-184-.08c0-30.96 25.04-56 56-56s56 25.04 56 56-25.04 56-56 56-56-25.04-56-56z" fill={showInfo ? "#ccffdc" : "#cce4ff"} />
          <g fill={showInfo ? "#278001" : "#007aff"}>
            <path d="M264.1 143.92c0-39.696-32.296-72-72-72s-72 32.304-72 72 32.296 72 72 72 72-32.296 72-72zm-112 0c0-22.056 17.944-40 40-40s40 17.944 40 40-17.944 40-40 40-40-17.944-40-40z"/>
            <path d="M192.1 384.2l12.008-13.624C217.612 355.24 336.1 218.608 336.1 144c0-79.4-64.6-144-144-144s-144 64.6-144 144c0 74.608 118.488 211.24 131.992 226.576L192.1 384.2zm0-352.2c61.76 0 112 50.24 112 112 0 47.648-72.32 143.968-112 191.4-39.68-47.432-112-143.752-112-191.4 0-61.76 50.24-112 112-112z"/>
          </g>
        </svg>
      </button>

      {showInfo &&
        <div className={styles.info}>
          <button onClick={() => toogleShowInfo(false)}>Х</button>

          <h4 className={styles.title}>{props.item.name}</h4>

          {props.item.address && (
            <div className={styles.address}>
              <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6.95C3 3.66 5.683 1 9 1s6 2.66 6 5.95C15 11.412 9 18 9 18S3 11.412 3 6.95zM9 9a2 2 0 100-4 2 2 0 000 4z" fill="#000" opacity=".38"/>
              </svg>

              <span>{props.item.address}</span>
            </div>
          )}
        </div>
      }
    </>
  )
}

export default MarkerButton;
