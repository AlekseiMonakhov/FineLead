// FormStep1.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface FormStep1Props {
  data: {
    title: string;
    note: string;
    advertiser: string;
    kpi: string;
  };
  onChange: (field: string, value: string) => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ data, onChange }) => (
  <>
    <TextField
      name="title"
      label="Заголовок"
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.title}
      onChange={(e) => onChange('title', e.target.value)}
    />
    <TextField
      name="note"
      label="Заметка"
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.note}
      onChange={(e) => onChange('note', e.target.value)}
    />
    <TextField
      name="advertiser"
      label="Рекламодатель"
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.advertiser}
      onChange={(e) => onChange('advertiser', e.target.value)}
    />
    <TextField
      name="kpi"
      label="KPI"
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.kpi}
      onChange={(e) => onChange('kpi', e.target.value)}
    />
  </>
);

export default FormStep1;
