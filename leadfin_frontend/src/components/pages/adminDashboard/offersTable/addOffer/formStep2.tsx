import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormStep2Props } from '../interfaces';


export const FormStep2: React.FC<FormStep2Props> = ({
    data,
    onChange,
    onLogoUpload,
}) => (
    <>
        <div>
            <input
                accept=".png, .jpg, .jpeg"
                style={{ display: 'none' }}
                id="logo-upload"
                type="file"
                onChange={(e) => onLogoUpload(e.target.files ? e.target.files[0] : null)}
            />
            <label htmlFor="logo-upload">
                <Button variant="outlined" component="span">
                    Загрузить лого
                </Button>
                <p>png jpg jpeg 200*200</p>
            </label>
            {data.logo && (
                <div>
                    <img
                        src={URL.createObjectURL(data.logo)}
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
            value={data.status}
            onChange={(e) => onChange('status', e.target.value)}
        >
            <MenuItem value="Активен">Активен</MenuItem>
            <MenuItem value="Приостановлен">Приостановлен</MenuItem>
            <MenuItem value="Отключен">Отключен</MenuItem>
        </TextField>
        <FormControlLabel
            control={
                <Checkbox
                    name="sendEmailStatusChange"
                    checked={data.sendEmailStatusChange}
                    onChange={(e) => onChange('sendEmailStatusChange', e.target.checked)}
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
            value={data.tags}
            onChange={(e) => onChange('tags', e.target.value)}
        />
        <TextField
            name="privacyLevel"
            label="Уровень приватности"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={data.privacyLevel}
            onChange={(e) => onChange('privacyLevel', e.target.value)}
        >
            <MenuItem value="Приватный">Приватный</MenuItem>
            <MenuItem value="Премодерация">Премодерация</MenuItem>
            <MenuItem value="Публичный">Публичный</MenuItem>
        </TextField>
        <FormControlLabel
            control={
                <Checkbox
                    name="scheduleEnabled"
                    checked={data.scheduleEnabled}
                    onChange={(e) => onChange('scheduleEnabled', e.target.checked)}
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
            value={data.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
        />
        <TextField
            name="endDate"
            label="Дата отключения"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
        />
        <TextField
            name="timeZone"
            label="Часовой пояс"
            placeholder="UTC+00:00"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.timeZone}
            onChange={(e) => onChange('timeZone', e.target.value)}
        />
        <TextField
            name="statusAfterStop"
            label="Статус после остановки"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={data.statusAfterStop}
            onChange={(e) => onChange('statusAfterStop', e.target.value)}
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
            value={data.privacyLevelAfterStop}
            onChange={(e) => onChange('privacyLevelAfterStop', e.target.value)}
        >
            <MenuItem value="Приватный">Приватный</MenuItem>
            <MenuItem value="Премодерация">Премодерация</MenuItem>
            <MenuItem value="Публичный">Публичный</MenuItem>
        </TextField>
        <FormControlLabel
            control={
                <Checkbox
                    name="sendEmailStatusChangeBeforeStop"
                    checked={data.sendEmailStatusChangeBeforeStop}
                    onChange={(e) => onChange('sendEmailStatusChangeBeforeStop', e.target.checked)}
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
            value={data.sendEmailTime}
            onChange={(e) => onChange('sendEmailTime', e.target.value)}
        />
        <TextField
            name="categories"
            label="Категории"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.categories}
            onChange={(e) => onChange('categories', e.target.value)}
        />
    </>
);

export const defaultStep2Data = {
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
}
