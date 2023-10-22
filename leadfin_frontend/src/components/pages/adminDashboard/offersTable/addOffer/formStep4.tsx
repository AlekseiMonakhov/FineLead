import React from 'react';
import TextField from '@mui/material/TextField';
import { FormStep4Props } from '../interfaces';


export const FormStep4: React.FC<FormStep4Props> = ({ data, onChange }) => (
    <>
        <TextField
            name="countries"
            label="Страны"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.countries}
            onChange={(e) => onChange('countries', e.target.value)}
        />
        <TextField
            name="regions"
            label="Регионы"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.regions}
            onChange={(e) => onChange('regions', e.target.value)}
        />
        <TextField
            name="cities"
            label="Города"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.cities}
            onChange={(e) => onChange('cities', e.target.value)}
        />
        <TextField
            name="connectionType"
            label="Тип подключения"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.connectionType}
            onChange={(e) => onChange('connectionType', e.target.value)}
        />
        <TextField
            name="operatingSystem"
            label="Операционная система"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.operatingSystem}
            onChange={(e) => onChange('operatingSystem', e.target.value)}
        />
        <TextField
            name="mobileOperators"
            label="Мобильные операторы"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.mobileOperators}
            onChange={(e) => onChange('mobileOperators', e.target.value)}
        />
        <TextField
            name="devices"
            label="Устройства"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.devices}
            onChange={(e) => onChange('devices', e.target.value)}
        />
        <TextField
            name="deviceManufacturers"
            label="Производители устройств"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.deviceManufacturers}
            onChange={(e) => onChange('deviceManufacturers', e.target.value)}
        />
        <TextField
            name="browsers"
            label="Браузеры"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.browsers}
            onChange={(e) => onChange('browsers', e.target.value)}
        />
        <TextField
            name="ipRange"
            label="Диапазон IP-адресов"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.ipRange}
            onChange={(e) => onChange('ipRange', e.target.value)}
        />
        <TextField
            name="postalCodes"
            label="Почтовые индексы"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.postalCodes}
            onChange={(e) => onChange('postalCodes', e.target.value)}
        />
    </>
);

export const defaultStep4Data = {
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
}

