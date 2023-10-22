import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <ErrorOutlineIcon className={styles.errorIcon} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>Страница не найдена</p>
    </div>
  );
}
