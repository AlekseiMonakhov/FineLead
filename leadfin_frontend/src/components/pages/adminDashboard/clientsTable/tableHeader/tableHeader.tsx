import React, { useState } from 'react';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import PublishIcon from '@mui/icons-material/Publish';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import AddClient from '../addClient/addClient';
import ClientsExport from '../clientsExport/clientsExport';
import ClientsImport from '../clientsImport/clientsImport';
import { TableHeaderProps } from '../interfaces';


function TableHeader({ numberOfClients, onEditColumns }: TableHeaderProps) {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isClientsExportModalOpen, setIsClientsExportModalOpen] = useState(false);
  const [isClientsImportModalOpen, setIsClientsImportModalOpen] = useState(false);

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
        <Button startIcon={<PublishIcon />} className={styles.button} onClick={handleOpenClientsImportModal}>
        </Button>
        <Button startIcon={<GetAppIcon />} className={styles.button} onClick={handleOpenClientsExportModal}>
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenAddClientModal}>
        </Button>
      </div>
      <AddClient open={isAddClientModalOpen} onClose={() => setIsAddClientModalOpen(false)} />
      <ClientsExport open={isClientsExportModalOpen} onClose={() => setIsClientsExportModalOpen(false)} />
      <ClientsImport open={isClientsImportModalOpen} onClose={() => setIsClientsImportModalOpen(false)} /> {/* Добавьте модальное окно ClientsImport */}
    </div>
  );
}

export default TableHeader;
