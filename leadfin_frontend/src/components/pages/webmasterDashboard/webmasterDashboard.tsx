import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import styles from './webmasterDashboard.module.css'

export default function WebmasterDashboard() {
  return (
    <div className={styles.page}>
      <header className={styles['page-header']}>
        <h3 className={styles.title}>LeadFin</h3>
        <h1 className={styles.text}>Здесь будет панель Вебмастера</h1>
        <BuildIcon className={styles.icon} />
        <a className={styles.text}>Ведутся работы</a>
      </header>
    </div>
  );
}
