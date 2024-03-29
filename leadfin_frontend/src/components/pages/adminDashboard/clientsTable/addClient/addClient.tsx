import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import styles from './addClient.module.css';
import { AddClientProps } from '../interfaces';


const AddClient: React.FC<AddClientProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    contactPerson: '',
    commMethod: '',
    manager: '',
    website: '',
    address1: '',
    city: '',
    country: 'РФ',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <div className={styles.formSection}>
          <h2>О рекламодателе</h2>
          <TextField
            name="companyName"
            label="Имя компании"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.companyName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="contactPerson"
            label="Контактное лицо"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <TextField
            name="commMethod"
            label="Способ связи"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.commMethod}
            onChange={handleChange}
          />
          <TextField
            name="manager"
            label="Менеджер"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={formData.manager}
            onChange={handleChange}
          >
            <MenuItem value="-">-</MenuItem>
          </TextField>
          <TextField
            name="website"
            label="Сайт"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formSection}>
          <h2>Информация о местоположении</h2>
          <TextField
            name="address1"
            label="Адрес 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.address1}
            onChange={handleChange}
          />
          <TextField
            name="city"
            label="Город"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            name="country"
            label="Страна"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={formData.country}
            onChange={handleChange}
          >
            <MenuItem value="РФ">РФ</MenuItem>
          </TextField>
          <TextField
            name="postalCode"
            label="Индекс"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className={styles.submitButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            className={styles.addButton}
          >
            Добавить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddClient;
