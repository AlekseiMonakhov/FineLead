import React, { useState } from 'react';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import AddOffer from '../addOffer/addOffer';
import OfferExport from '../offersExport/offerExport';
import { TableHeaderProps } from '../interfaces';


function TableHeader({ numberOfOffers, onEditColumns }: TableHeaderProps) {
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
      <div className={styles.foundClients}>
        Найдено {numberOfOffers} офферов
      </div>
      <div className={styles.buttons}>
        <Button startIcon={<GetAppIcon />} className={styles.button} onClick={handleOpenOfferExportModal}>
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenAddOfferModal}>
        </Button>
      </div>
      <AddOffer open={isAddOfferModalOpen} onClose={() => setIsAddOfferModalOpen(false)} />
      <OfferExport open={isOfferExportModalOpen} onClose={() => setIsOfferExportModalOpen(false)} />
    </div>
  );
}

export default TableHeader;
