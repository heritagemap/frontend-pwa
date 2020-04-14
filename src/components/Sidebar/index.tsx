import React, { useState } from 'react';
import styles from './Sidebar.module.scss';

function Sidebar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className={styles.sidebar}>
      <form className={styles.searchForm}>
        {!isSearchOpen && (
          <button type="button" onClick={() => setIsSearchOpen(true)} className={`${styles.button} ${styles.openButton}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black"/>
            </svg>
          </button>
        )}

        {isSearchOpen && (
          <>
            <input className={styles.search} type="text" autoFocus />

            <button type="button" onClick={() => setIsSearchOpen(false)} className={`${styles.button} ${styles.closeButton}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black"/>
              </svg>
            </button>
          </>
        )}
      </form>
    </nav>
  );
}

export default Sidebar;
