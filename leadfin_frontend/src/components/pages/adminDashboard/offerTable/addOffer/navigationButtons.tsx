// NavigationButtons.tsx
import React from 'react';
import Button from '@mui/material/Button';

interface NavigationButtonsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  return (
    <div>
      {currentStep > 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onPrevious}
        >
          Назад
        </Button>
      )}
      {currentStep < 4 && (
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          Далее
        </Button>
      )}
      {currentStep === 4 && (
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Добавить
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
