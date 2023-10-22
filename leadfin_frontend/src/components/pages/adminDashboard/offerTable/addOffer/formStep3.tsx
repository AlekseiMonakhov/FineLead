// FormStep3.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface FormStep3Props {
    data: {
        trackingURL: string;
        viewURL: string;
        trafficBackURL: string;
        trackingDomainURL: string;
        sessionLifetime: string;
        minSessionLifetime: string;
    };
    onChange: (field: string, value: string) => void;
}

export const FormStep3: React.FC<FormStep3Props> = ({ data, onChange }) => (
    <>
        <TextField
            name="trackingURL"
            label="УРЛ трекинга"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.trackingURL}
            onChange={(e) => onChange('trackingURL', e.target.value)}
        />
        <TextField
            name="viewURL"
            label="УРЛ просмотра"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.viewURL}
            onChange={(e) => onChange('viewURL', e.target.value)}
        />
        <TextField
            name="trafficBackURL"
            label="TrafficBack URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.trafficBackURL}
            onChange={(e) => onChange('trafficBackURL', e.target.value)}
        />
        <TextField
            name="trackingDomainURL"
            label="Трекинг домен URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.trackingDomainURL}
            onChange={(e) => onChange('trackingDomainURL', e.target.value)}
        />
        <TextField
            name="sessionLifetime"
            label="Время жизни сессии клика и просмотра"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.sessionLifetime}
            onChange={(e) => onChange('sessionLifetime', e.target.value)}
        />
        <TextField
            name="minSessionLifetime"
            label="Минимальное время жизни сессии клика и просмотра"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.minSessionLifetime}
            onChange={(e) => onChange('minSessionLifetime', e.target.value)}
        />
    </>
);

export const defaultStep3Data = {
    trackingURL: '',
    viewURL: '',
    trafficBackURL: '',
    trackingDomainURL: '',
    sessionLifetime: '',
    minSessionLifetime: '',
}
