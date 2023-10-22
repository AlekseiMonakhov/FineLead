import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import FormStep1 from './formStep1';
import FormStep2 from './formStep2';
import FormStep3 from './formStep3';
import FormStep4 from './formStep4';
import NavigationButtons from './navigationButtons';
import styles from './addOffer.module.css'; // Подключение стилей

interface AddOfferFormProps {
  open: boolean;
  onClose: () => void;
}

const AddOfferForm: React.FC<AddOfferFormProps> = ({ open, onClose }) => {
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
        {currentStep === 1 && (
          <FormStep1 data={step1Data} onChange={(field, value) => setStep1Data({ ...step1Data, [field]: value })} />
        )}
        {currentStep === 2 && (
          <FormStep2
            data={step2Data}
            onChange={(field, value) => setStep2Data({ ...step2Data, [field]: value })}
            onLogoUpload={(file) => setStep2Data({ ...step2Data, logo: file })}
          />
        )}
        {currentStep === 3 && (
          <FormStep3 data={step3Data} onChange={(field, value) => setStep3Data({ ...step3Data, [field]: value })} />
        )}
        {currentStep === 4 && (
          <FormStep4 data={step4Data} onChange={(field, value) => setStep4Data({ ...step4Data, [field]: value })} />
        )}
        <NavigationButtons
          currentStep={currentStep}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default AddOfferForm;
