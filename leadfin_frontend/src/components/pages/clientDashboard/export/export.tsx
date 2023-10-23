import React from "react";
import styles from "./export.module.css";
import BuildIcon from '@mui/icons-material/Build';

export default function Export() {
  return (
    <div className={styles.exportContainer}>
      <header className={styles.header}>
        <BuildIcon className={styles.icon} />
        <a className={styles.title}>Ведутся работы</a>
      </header>
    </div>
  );
}
