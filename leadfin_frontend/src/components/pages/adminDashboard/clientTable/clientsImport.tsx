import React, { useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import styles from './clientsImport.module.css';

interface ClientsImportProps {
  open: boolean;
  onClose: () => void;
}

const ClientsImport: React.FC<ClientsImportProps> = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      setSelectedFile(file);
    }
  };

  const handleApply = () => {
    if (selectedFile) {
      console.log('Выбранный файл:', selectedFile.name);
    }
    onClose();
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2>Импорт</h2>
        <p>Обязательно используйте разделители (',' ';') в Вашем CSV файле, а также обязательное поле Название компании</p>
        <InsertDriveFileIcon className={styles.fileIcon} />
        <a href="#" className={styles.link}>Узнать больше</a>
        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          onChange={handleFileChange}
        />
        {selectedFile && (
          <div className={styles.selectedFile}>{selectedFile.name}</div>
        )}
        <div className={styles.buttonContainer}>
          {!selectedFile && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInputRef.current?.click()}
              className={styles.selectButton}
            >
              Выбрать файл
            </Button>
          )}
          {selectedFile && (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                className={styles.button}
              >
                Отмена
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApply}
                className={styles.button}
              >
                Применить
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClientsImport;
