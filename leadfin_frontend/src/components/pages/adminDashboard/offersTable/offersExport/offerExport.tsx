import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './offersExport.module.css';
import { columnsMapping } from '../mappers';
import { OffersExportProps } from '../interfaces';


const ClientsExport: React.FC<OffersExportProps> = ({ open, onClose }) => {
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialSelectedColumns: Record<string, boolean> = {};
    Object.keys(columnsMapping).forEach((column) => {
      initialSelectedColumns[column] = true;
    });
    setSelectedColumns(initialSelectedColumns);
  }, []);

  const handleColumnChange = (column: string) => {
    const updatedColumns = { ...selectedColumns, [column]: !selectedColumns[column] };
    setSelectedColumns(updatedColumns);
  };

  const handleApply = () => {
    console.log('Выбранные столбцы:', selectedColumns);
    onClose();
  };

  const columns = Object.keys(columnsMapping);
  const columnGroups = [];
  const groupSize = 5;
  for (let i = 0; i < columns.length; i += groupSize) {
    columnGroups.push(columns.slice(i, i + groupSize));
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2>Экспорт в файл .CSV</h2>
        <p>Выберите поля, которые хотите экспортировать:</p>
        <div className={styles.checkboxContainer}>
          {columnGroups.map((group, index) => (
            <div key={index} className={styles.checkboxColumn}>
              {group.map((column) => (
                <FormControlLabel
                  key={column}
                  className={styles.checkbox}
                  control={<Checkbox checked={selectedColumns[column]} onChange={() => handleColumnChange(column)} />}
                  label={column}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="outlined" onClick={onClose} className={styles.button}>
            Отмена
          </Button>
          <Button variant="contained" color="primary" onClick={handleApply} className={styles.button}>
            Экспорт
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClientsExport;
