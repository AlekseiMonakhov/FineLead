import React from 'react';
import Button from '@mui/material/Button'; // Добавьте импорт

import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './clientsTable.module.css';

function TableHeader({ numberOfClients }: { numberOfClients: number }) {
  return (
    <div className={styles.header}>
      <div className={styles.foundClients}>
        Найдено {numberOfClients} рекламодателей
      </div>
      <div className={styles.buttons}>
        <Button startIcon={<ImportExportIcon />} className={styles.button}>
          Импорт
        </Button>
        <Button startIcon={<ImportExportIcon />} className={styles.button}>
          Экспорт
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button}>
          Редактировать столбцы
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button}>
          Добавить рекламодателя
        </Button>
      </div>
    </div>
  );
}

export default TableHeader;
