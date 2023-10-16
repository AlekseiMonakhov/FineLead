import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import styles from './addOffer.module.css';

interface AddClientProps {
  open: boolean;
  onClose: () => void;
}

const AddOffer: React.FC<AddClientProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    note: '',
    advertiser: '',
    logo: null as File | null,
    status: 'Активен',
    sendEmail: false,
    tags: '',
    privacyLevel: 'Публичный',
    scheduleEnabled: false,
    startDate: '',
    endDate: '',
    timeZone: '',
    categories: '',
    trackingURL: '',
    viewURL: '',
    trafficBackURL: '',
    trackingDomainURL: '',
    redirectType: '302 редирект',
    sessionLifetime: '',
    minSessionLifetime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2>Оффер</h2>
        <TextField
          name="title"
          label="Заголовок"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          name="note"
          label="Заметка"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.note}
          onChange={handleChange}
        />
        <TextField
          name="advertiser"
          label="Рекламодатель"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.advertiser}
          onChange={handleChange}
        />
        <div>
          <input
            accept=".png, .jpg, .jpeg"
            style={{ display: 'none' }}
            id="logo-upload"
            type="file"
            onChange={handleLogoChange}
          />
          <label htmlFor="logo-upload">
            <Button variant="outlined" component="span">
              Загрузить лого
            </Button>
            <p>png jpg jpeg 200*200</p>
          </label>
          {formData.logo && (
            <div>
              <img src={URL.createObjectURL(formData.logo)} alt="Лого" style={{ maxWidth: '200px', maxHeight: '200px' }} />
              
            </div>
          )}
        </div>
        <TextField
          name="status"
          label="Статус"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Активен">Активен</MenuItem>
          <MenuItem value="Отключен">Отключен</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              name="sendEmail"
              checked={formData.sendEmail}
              onChange={handleChange}
            />
          }
          label="Отправить email активным вебмастерам об изменении статуса"
        />
        <TextField
          name="tags"
          label="Тэги"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.tags}
          onChange={handleChange}
        />
        <TextField
          name="privacyLevel"
          label="Уровень приватности"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          value={formData.privacyLevel}
          onChange={handleChange}
        >
          <MenuItem value="Приватный">Приватный</MenuItem>
          <MenuItem value="Премодерация">Премодерация</MenuItem>
          <MenuItem value="Публичный">Публичный</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              name="scheduleEnabled"
              checked={formData.scheduleEnabled}
              onChange={handleChange}
            />
          }
          label="Расписание"
        />
        {formData.scheduleEnabled && (
          <>
            <TextField
              name="startDate"
              label="Дата запуска"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.startDate}
              onChange={handleChange}
            />
            <TextField
              name="endDate"
              label="Дата отключения"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.endDate}
              onChange={handleChange}
            />
            <TextField
              name="timeZone"
              label="Часовой пояс"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.timeZone}
              onChange={handleChange}
            />
          </>
        )}
        <TextField
          name="categories"
          label="Категории"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.categories}
          onChange={handleChange}
        />
        <TextField
          name="trackingURL"
          label="УРЛ трекинга"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.trackingURL}
          onChange={handleChange}
        />
        <TextField
          name="viewURL"
          label="УРЛ просмотра"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.viewURL}
          onChange={handleChange}
        />
        <TextField
          name="trafficBackURL"
          label="TrafficBack URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.trafficBackURL}
          onChange={handleChange}
        />
        <TextField
          name="trackingDomainURL"
          label="Трекинг домен URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.trackingDomainURL}
          onChange={handleChange}
        />
        <TextField
          name="redirectType"
          label="Тип редиректа"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          value={formData.redirectType}
          onChange={handleChange}
        >
          <MenuItem value="302 редирект">302 редирект</MenuItem>
          <MenuItem value="http meta-redirect">http meta-redirect</MenuItem>
          <MenuItem value="JS meta-redirect">JS meta-redirect</MenuItem>
          <MenuItem value="302 redirect with hidden refferer">302 redirect with hidden refferer</MenuItem>
        </TextField>
        <TextField
          name="sessionLifetime"
          label="Время жизни сессии клика и просмотра"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.sessionLifetime}
          onChange={handleChange}
        />
        <TextField
          name="minSessionLifetime"
          label="Минимальное время жизни сессии клика и просмотра"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.minSessionLifetime}
          onChange={handleChange}
        />
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

export default AddOffer;
