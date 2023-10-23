import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import OfferExport from '../statisticExport/statisticExport';
import { TableHeaderProps } from '../interfaces';
import CustomColumnModal from '../castomColumn/customColumn';

function TableHeader({ onEditColumns, onAddCustomColumn }: TableHeaderProps) {
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [isOfferExportModalOpen, setIsOfferExportModalOpen] = useState(false);
  const [isCustomColumnModalOpen, setIsCustomColumnModalOpen] = useState(false);

  const handleOpenAddOfferModal = () => {
    setIsAddOfferModalOpen(true);
  };

  const handleOpenOfferExportModal = () => {
    setIsOfferExportModalOpen(true);
  };

  const handleOpenCustomColumnModal = () => {
    setIsCustomColumnModalOpen(true);
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
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenCustomColumnModal}>
          Кастомная колонка
        </Button> 
      </div>
      <OfferExport open={isOfferExportModalOpen} onClose={() => setIsOfferExportModalOpen(false)} />
      <CustomColumnModal open={isCustomColumnModalOpen} onClose={() => setIsCustomColumnModalOpen(false)} onSave={onAddCustomColumn} />
    </div>
  );
}

export default TableHeader;
