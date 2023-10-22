import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CreateIcon from '@mui/icons-material/Create';

interface EditOfferModalProps {
  open: boolean;
  onClose: () => void;
  offer: any
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ open, onClose, offer }) => {
  const [editOffer, setEditOffer] = useState(offer);

  const handleSave = () => {
    onClose();
  };

  const handleEditNote = () => {
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
        }}
      >
        <h2>Редактирование оффера</h2>
        <Button
          startIcon={<EditIcon />}
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Сохранить оффер
        </Button>
        <Button
          startIcon={<CreateIcon />}
          onClick={handleEditNote}
          variant="contained"
          color="secondary"
        >
          Редактировать заметку
        </Button>
      </Box>
    </Modal>
  );
};

export default EditOfferModal;
