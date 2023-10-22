import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './tableHeader.module.css';
import OfferExport from '../statisticExport/statisticExport';
import { TableHeaderProps } from '../interfaces';


function TableHeader({ onEditColumns }: TableHeaderProps) {
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [isOfferExportModalOpen, setIsOfferExportModalOpen] = useState(false);

  const handleOpenAddOfferModal = () => {
    setIsAddOfferModalOpen(true);
  };

  const handleOpenOfferExportModal = () => {
    setIsOfferExportModalOpen(true);
  };


  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        <Button startIcon={<ImportExportIcon />} className={styles.button} onClick={handleOpenOfferExportModal}>
          Экспорт 
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
          Редактировать столбцы
        </Button>
      </div>
      <OfferExport open={isOfferExportModalOpen} onClose={() => setIsOfferExportModalOpen(false)} />
    </div>
  );
}

export default TableHeader;
