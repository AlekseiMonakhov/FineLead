import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './clientsTable.module.css';
import AddClient from './addClient';

type TableHeaderProps = {
  numberOfClients: number;
  onEditColumns: () => void;
};

function TableHeader({ numberOfClients, onEditColumns }: TableHeaderProps) {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const handleOpenAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

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
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
          Редактировать столбцы
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenAddClientModal}>
          Добавить рекламодателя
        </Button>
      </div>
      <AddClient open={isAddClientModalOpen} onClose={() => setIsAddClientModalOpen(false)} />
    </div>
  );
}

export default TableHeader;
