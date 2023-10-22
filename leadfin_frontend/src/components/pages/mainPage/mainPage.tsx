import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import styles from './mainPage.module.css';

export default function MainPage() {
  return (
    <div className={styles.MainPage}>
      <header className={styles['MainPage-header']}>
        <h3 className={styles.title}>LeadFin</h3>
        <h1 className={styles.text}>Здесь будет главная страница</h1>
        <BuildIcon className={styles.icon} />
        <a className={styles.text}>Ведутся работы</a>
      </header>
    </div>
  );
}
