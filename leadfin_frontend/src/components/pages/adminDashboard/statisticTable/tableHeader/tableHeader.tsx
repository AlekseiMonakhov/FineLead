import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import Export from '../statisticExport/statisticExport';
import { TableHeaderProps } from '../interfaces';
import CustomColumnModal from '../castomColumn/customColumn';
import GetAppIcon from '@mui/icons-material/GetApp';


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
        <Button startIcon={<GetAppIcon />} className={styles.button} onClick={handleOpenOfferExportModal}>
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenCustomColumnModal}>
        </Button> 
      </div>
      <Export open={isOfferExportModalOpen} onClose={() => setIsOfferExportModalOpen(false)} />
      <CustomColumnModal open={isCustomColumnModalOpen} onClose={() => setIsCustomColumnModalOpen(false)} onSave={onAddCustomColumn} />
    </div>
  );
}

export default TableHeader;
