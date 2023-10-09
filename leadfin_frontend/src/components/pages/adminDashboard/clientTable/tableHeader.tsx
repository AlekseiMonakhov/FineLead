import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import AddClient from './addClient';
import ClientsExport from './clientsExport';
import ClientsImport from './clientsImport'; 

type TableHeaderProps = {
  numberOfClients: number;
  onEditColumns: () => void;
};

function TableHeader({ numberOfClients, onEditColumns }: TableHeaderProps) {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isClientsExportModalOpen, setIsClientsExportModalOpen] = useState(false);
  const [isClientsImportModalOpen, setIsClientsImportModalOpen] = useState(false); // Добавьте состояние для модального окна ClientsImport

  const handleOpenAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

  const handleOpenClientsExportModal = () => {
    setIsClientsExportModalOpen(true);
  };

  const handleOpenClientsImportModal = () => {
    setIsClientsImportModalOpen(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.foundClients}>
        Найдено {numberOfClients} рекламодателей
      </div>
      <div className={styles.buttons}>
        <Button startIcon={<ImportExportIcon />} className={styles.button} onClick={handleOpenClientsImportModal}>
          Импорт
        </Button>
        <Button startIcon={<ImportExportIcon />} className={styles.button} onClick={handleOpenClientsExportModal}>
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
      <ClientsExport open={isClientsExportModalOpen} onClose={() => setIsClientsExportModalOpen(false)} />
      <ClientsImport open={isClientsImportModalOpen} onClose={() => setIsClientsImportModalOpen(false)} /> {/* Добавьте модальное окно ClientsImport */}
    </div>
  );
}

export default TableHeader;
