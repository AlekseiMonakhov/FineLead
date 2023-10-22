import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import Calculator from './calculator';
import FieldsButton from './fieldsButton';
import styled from '@emotion/styled';

interface CustomColumnModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (formula: string, columnName: string) => void;
}

const StyledButton = styled(Button)`
    padding: 8px 16px;
    font-size: 16px;
    min-width: 100px;
`;

const CustomColumnModal: React.FC<CustomColumnModalProps> = ({ open, onClose, onSave }) => {
    const [formula, setFormula] = useState('');
    const [columnName, setColumnName] = useState('');

    const handleCalculatorInput = (value: string) => {
        if (value === 'C') {
            setFormula('');
        } else {
            setFormula(prev => prev + value);
        }
    }

    const handleFieldSelection = (field: string) => {
        setFormula(prev => prev + field);
    }

    const handleSave = () => {
        onSave(formula, columnName);
        setFormula('');
        setColumnName('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Название"
                            variant="outlined"
                            fullWidth
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Формула"
                            variant="outlined"
                            fullWidth
                            value={formula}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Calculator onInput={handleCalculatorInput} />
                    </Grid>
                    <Grid item xs={6}>
                        <FieldsButton onSelectField={handleFieldSelection} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={handleSave} color="primary">Сохранить</StyledButton>
                <StyledButton onClick={onClose} color="secondary">Отменить</StyledButton>
            </DialogActions>
        </Dialog>
    );
}

export default CustomColumnModal;
