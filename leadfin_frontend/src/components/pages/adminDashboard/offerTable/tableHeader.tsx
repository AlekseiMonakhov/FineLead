import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import styles from './tableHeader.module.css';
import AddOffer from './addOffer';
import OfferExport from './offerExport';

type TableHeaderProps = {
  numberOfOffers: number;
  onEditColumns: () => void;
};

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
        <Button startIcon={<ImportExportIcon />} className={styles.button} onClick={handleOpenOfferExportModal}>
          Экспорт 
        </Button>
        <Button startIcon={<SettingsIcon />} className={styles.button} onClick={onEditColumns}>
          Редактировать столбцы
        </Button>
        <Button startIcon={<AddIcon />} className={styles.button} onClick={handleOpenAddOfferModal}>
          Добавить оффер
        </Button>
      </div>
      <AddOffer open={isAddOfferModalOpen} onClose={() => setIsAddOfferModalOpen(false)} />
      <OfferExport open={isOfferExportModalOpen} onClose={() => setIsOfferExportModalOpen(false)} />
    </div>
  );
}

export default TableHeader;
