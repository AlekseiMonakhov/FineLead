import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (columnDetails: { name: string, formula: string }) => void;
}

function CustomColumnModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [formula, setFormula] = useState('');

  const handleSave = () => {
    if(name && formula) {
      onSave({ name, formula });
      setName('');
      setFormula('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать кастомную колонку</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Название"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Формула"
          fullWidth
          variant="outlined"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomColumnModal;
