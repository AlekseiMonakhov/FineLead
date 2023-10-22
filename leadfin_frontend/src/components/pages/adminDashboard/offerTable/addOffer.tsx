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
  const [currentStep, setCurrentStep] = useState(1);

  const [step1Data, setStep1Data] = useState({
    title: '',
    note: '',
    advertiser: '',
    kpi: '',
  });

  const [step2Data, setStep2Data] = useState({
    logo: null as File | null,
    status: 'Активен',
    sendEmailStatusChange: false,
    tags: '',
    privacyLevel: 'Публичный',
    scheduleEnabled: false,
    startDate: '',
    endDate: '',
    timeZone: '',
    statusAfterStop: '',
    privacyLevelAfterStop: 'Публичный',
    sendEmailStatusChangeBeforeStop: false,
    sendEmailTime: '',
    categories: '',
  });

  const [step3Data, setStep3Data] = useState({
    trackingURL: '',
    viewURL: '',
    trafficBackURL: '',
    trackingDomainURL: '',
    sessionLifetime: '',
    minSessionLifetime: '',
  });

  const [step4Data, setStep4Data] = useState({
    countries: '',
    regions: '',
    cities: '',
    connectionType: '',
    operatingSystem: '',
    mobileOperators: '',
    devices: '',
    deviceManufacturers: '',
    browsers: '',
    ipRange: '',
    postalCodes: '',
  });

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const formData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      ...step4Data,
    };

    console.log(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2>Добавить оффер</h2>

        <div className={styles.formSection}>
          {currentStep === 1 && (
            <>
              <TextField
                name="title"
                label="Заголовок"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step1Data.title}
                onChange={(e) => setStep1Data({ ...step1Data, title: e.target.value })}
              />
              <TextField
                name="note"
                label="Заметка"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step1Data.note}
                onChange={(e) => setStep1Data({ ...step1Data, note: e.target.value })}
              />
              <TextField
                name="advertiser"
                label="Рекламодатель"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step1Data.advertiser}
                onChange={(e) => setStep1Data({ ...step1Data, advertiser: e.target.value })}
              />
              <TextField
                name="kpi"
                label="KPI"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step1Data.kpi}
                onChange={(e) => setStep1Data({ ...step1Data, kpi: e.target.value })}
              />
            </>
          )}
        </div>

        <div className={styles.formSection}>
          {currentStep === 2 && (
            <>
              <div>
                <input
                  accept=".png, .jpg, .jpeg"
                  style={{ display: 'none' }}
                  id="logo-upload"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setStep2Data({ ...step2Data, logo: file });
                  }}
                />
                <label htmlFor="logo-upload">
                  <Button variant="outlined" component="span">
                    Загрузить лого
                  </Button>
                  <p>png jpg jpeg 200*200</p>
                </label>
                {step2Data.logo && (
                  <div>
                    <img
                      src={URL.createObjectURL(step2Data.logo)}
                      alt="Лого"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
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
                value={step2Data.status}
                onChange={(e) => setStep2Data({ ...step2Data, status: e.target.value })}
              >
                <MenuItem value="Активен">Активен</MenuItem>
                <MenuItem value="Приостановлен">Приостановлен</MenuItem>
                <MenuItem value="Отключен">Отключен</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sendEmailStatusChange"
                    checked={step2Data.sendEmailStatusChange}
                    onChange={(e) => setStep2Data({ ...step2Data, sendEmailStatusChange: e.target.checked })}
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
                value={step2Data.tags}
                onChange={(e) => setStep2Data({ ...step2Data, tags: e.target.value })}
              />
              <TextField
                name="privacyLevel"
                label="Уровень приватности"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={step2Data.privacyLevel}
                onChange={(e) => setStep2Data({ ...step2Data, privacyLevel: e.target.value })}
              >
                <MenuItem value="Приватный">Приватный</MenuItem>
                <MenuItem value="Премодерация">Премодерация</MenuItem>
                <MenuItem value="Публичный">Публичный</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    name="scheduleEnabled"
                    checked={step2Data.scheduleEnabled}
                    onChange={(e) => setStep2Data({ ...step2Data, scheduleEnabled: e.target.checked })}
                  />
                }
                label="Расписание"
              />
              <TextField
                name="startDate"
                label="Дата запуска"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step2Data.startDate}
                onChange={(e) => setStep2Data({ ...step2Data, startDate: e.target.value })}
              />
              <TextField
                name="endDate"
                label="Дата отключения"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step2Data.endDate}
                onChange={(e) => setStep2Data({ ...step2Data, endDate: e.target.value })}
              />
              <TextField
                name="timeZone"
                label="Часовой пояс"
                placeholder="UTC+00:00"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step2Data.timeZone}
                onChange={(e) => setStep2Data({ ...step2Data, timeZone: e.target.value })}
              />
              <TextField
                name="statusAfterStop"
                label="Статус после остановки"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={step2Data.statusAfterStop}
                onChange={(e) => setStep2Data({ ...step2Data, statusAfterStop: e.target.value })}
              >
                <MenuItem value="Активен">Активен</MenuItem>
                <MenuItem value="Приостановлен">Приостановлен</MenuItem>
                <MenuItem value="Отключен">Отключен</MenuItem>
              </TextField>
              <TextField
                name="privacyLevelAfterStop"
                label="Уровень приватности после остановки"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={step2Data.privacyLevelAfterStop}
                onChange={(e) => setStep2Data({ ...step2Data, privacyLevelAfterStop: e.target.value })}
              >
                <MenuItem value="Приватный">Приватный</MenuItem>
                <MenuItem value="Премодерация">Премодерация</MenuItem>
                <MenuItem value="Публичный">Публичный</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    name="sendEmailStatusChangeBeforeStop"
                    checked={step2Data.sendEmailStatusChangeBeforeStop}
                    onChange={(e) => setStep2Data({ ...step2Data, sendEmailStatusChangeBeforeStop: e.target.checked })}
                  />
                }
                label="Отправить email активным вебмастерам перед остановкой"
              />
              <TextField
                name="sendEmailTime"
                label="Время отправки email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step2Data.sendEmailTime}
                onChange={(e) => setStep2Data({ ...step2Data, sendEmailTime: e.target.value })}
              />
              <TextField
                name="categories"
                label="Категории"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step2Data.categories}
                onChange={(e) => setStep2Data({ ...step2Data, categories: e.target.value })}
              />
            </>
          )}
        </div>

        <div className={styles.formSection}>
          {currentStep === 3 && (
            <>
              <TextField
                name="trackingURL"
                label="УРЛ трекинга"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.trackingURL}
                onChange={(e) => setStep3Data({ ...step3Data, trackingURL: e.target.value })}
              />
              <TextField
                name="viewURL"
                label="УРЛ просмотра"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.viewURL}
                onChange={(e) => setStep3Data({ ...step3Data, viewURL: e.target.value })}
              />
              <TextField
                name="trafficBackURL"
                label="TrafficBack URL"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.trafficBackURL}
                onChange={(e) => setStep3Data({ ...step3Data, trafficBackURL: e.target.value })}
              />
              <TextField
                name="trackingDomainURL"
                label="Трекинг домен URL"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.trackingDomainURL}
                onChange={(e) => setStep3Data({ ...step3Data, trackingDomainURL: e.target.value })}
              />
              <TextField
                name="sessionLifetime"
                label="Время жизни сессии клика и просмотра"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.sessionLifetime}
                onChange={(e) => setStep3Data({ ...step3Data, sessionLifetime: e.target.value })}
              />
              <TextField
                name="minSessionLifetime"
                label="Минимальное время жизни сессии клика и просмотра"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step3Data.minSessionLifetime}
                onChange={(e) => setStep3Data({ ...step3Data, minSessionLifetime: e.target.value })}
              />
            </>
           )}
        </div>

        <div className={styles.formSection}>
          {currentStep === 4 && (
            <>
              <TextField
                name="countries"
                label="Страны"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.countries}
                onChange={(e) => setStep4Data({ ...step4Data, countries: e.target.value })}
              />
              <TextField
                name="regions"
                label="Регионы"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.regions}
                onChange={(e) => setStep4Data({ ...step4Data, regions: e.target.value })}
              />
              <TextField
                name="cities"
                label="Города"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.cities}
                onChange={(e) => setStep4Data({ ...step4Data, cities: e.target.value })}
              />
              <TextField
                name="connectionType"
                label="Тип подключения"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.connectionType}
                onChange={(e) => setStep4Data({ ...step4Data, connectionType: e.target.value })}
              />
              <TextField
                name="operatingSystem"
                label="Операционная система"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.operatingSystem}
                onChange={(e) => setStep4Data({ ...step4Data, operatingSystem: e.target.value })}
              />
              <TextField
                name="mobileOperators"
                label="Мобильные операторы"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.mobileOperators}
                onChange={(e) => setStep4Data({ ...step4Data, mobileOperators: e.target.value })}
              />
              <TextField
                name="devices"
                label="Устройства"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.devices}
                onChange={(e) => setStep4Data({ ...step4Data, devices: e.target.value })}
              />
              <TextField
                name="deviceManufacturers"
                label="Производители устройств"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.deviceManufacturers}
                onChange={(e) => setStep4Data({ ...step4Data, deviceManufacturers: e.target.value })}
              />
              <TextField
                name="browsers"
                label="Браузеры"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.browsers}
                onChange={(e) => setStep4Data({ ...step4Data, browsers: e.target.value })}
              />
              <TextField
                name="ipRange"
                label="Диапазон IP-адресов"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.ipRange}
                onChange={(e) => setStep4Data({ ...step4Data, ipRange: e.target.value })}
              />
              <TextField
                name="postalCodes"
                label="Почтовые индексы"
                variant="outlined"
                fullWidth
                margin="normal"
                value={step4Data.postalCodes}
                onChange={(e) => setStep4Data({ ...step4Data, postalCodes: e.target.value })}
              />
            </>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.stepNavigation}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePreviousStep}
              >
                Назад
              </Button>
            )}
            {currentStep < 4 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
              >
                Далее
              </Button>
            )}
          </div>

          {currentStep === 4 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<AddIcon />}
              className={styles.addButton}
            >
              Добавить
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddOffer;
