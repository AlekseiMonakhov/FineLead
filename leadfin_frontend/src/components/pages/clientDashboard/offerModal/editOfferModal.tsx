import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export interface NewOffer {
  id: number;
  name: string;
  url: string;
  clickPrice: number;
  country: string;
  created: string;
  modified: string;
  clicks: number;
}

interface EditOfferModalProps {
  open: boolean;
  onClose: () => void;
  onEditOffer: (editedOffer: NewOffer) => void;
  selectedOffer: NewOffer | null;
}

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function EditOfferModal({
  open,
  onClose,
  onEditOffer,
  selectedOffer,
}: EditOfferModalProps) {
  const [editedOffer, setEditedOffer] = useState<NewOffer | null>(null);

  useEffect(() => {
    setEditedOffer(selectedOffer);
  }, [selectedOffer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedOffer) {
      const { name, value } = event.target;
      setEditedOffer((prevOffer) => ({
        ...prevOffer!,
        [name]: value,
        modified: formatDate(new Date()), 
      }));
    }
  };

  const handleEditOfferClick = () => {
    if (editedOffer) {
      onEditOffer(editedOffer);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-offer-modal"
      aria-describedby="modal-for-editing-offer"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="edit-offer-modal">Изменить оффер</h2>
        {editedOffer && (
          <>
            <TextField
              fullWidth
              label="Название"
              name="name"
              value={editedOffer.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="URL"
              name="url"
              value={editedOffer.url}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Цена клика"
              name="clickPrice"
              type="number"
              value={editedOffer.clickPrice}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Страна"
              name="country"
              value={editedOffer.country}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={handleEditOfferClick}
              sx={{ mt: 2 }}
              color="primary"
            >
              Изменить оффер
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
