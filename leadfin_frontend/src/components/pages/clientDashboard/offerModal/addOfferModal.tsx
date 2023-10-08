import React, { useState } from 'react';
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




interface AddOfferModalProps {
  open: boolean;
  onClose: () => void;
  onAddOffer: (newOffer: NewOffer) => void;
}

export default function AddOfferModal({
  open,
  onClose,
  onAddOffer,
}: AddOfferModalProps) {
  const [newOffer, setNewOffer] = useState<NewOffer>({
    id: 0,
    name: '',
    url: '',
    clickPrice: 0,
    country: '',
    created: '',
    modified: '',
    clicks: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  const handleAddOfferClick = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    
    onAddOffer({
      ...newOffer,
      id: Date.now(),
      created: formattedDate, 
    });
  
    setNewOffer({
      id: 0,
      name: '',
      url: '',
      clickPrice: 0,
      country: '',
      created: '', 
      modified: '',
      clicks: 0,
    });
  
    onClose();
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-offer-modal"
      aria-describedby="modal-for-adding-new-offer"
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
        <h2 id="add-offer-modal">Добавить оффер</h2>
        <TextField
          fullWidth
          label="Название"
          name="name"
          value={newOffer.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="URL"
          name="url"
          value={newOffer.url}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Цена клика"
          name="clickPrice"
          type="number"
          value={newOffer.clickPrice}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Страна"
          name="country"
          value={newOffer.country}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleAddOfferClick}
          sx={{ mt: 2 }}
          color="primary"
        >
          Добавить оффер
        </Button>
      </Box>
    </Modal>
  );
}
