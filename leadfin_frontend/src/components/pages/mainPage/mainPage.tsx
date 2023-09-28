import React from 'react';
import styles from './mainPage.module.css'

export default function MainPage() {
    return (
      <div className={styles.MainPage}>
        <header className={styles['MainPage-header']}>
          <a>
             Main page will be here...
          </a>
        </header>
      </div>
    );
  }