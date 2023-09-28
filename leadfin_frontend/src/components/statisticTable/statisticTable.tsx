import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import styles from './statisticTable.module.css';
import { columns, dataFromDatabase } from './mockData';
import AddOfferModal, { NewOffer }  from '../offerModal/addOfferModal';
import EditOfferModal from '../offerModal/editOfferModal';

export default function StatisticTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [offers, setOffers] = useState(dataFromDatabase);
  const [selectedOffer, setSelectedOffer] = useState<NewOffer | null>(null);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setSelectedOffer(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (offer: NewOffer) => {
    setIsEditModalOpen(true);
    setSelectedOffer(offer);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddOffer = (newOffer: NewOffer) => {
    const newOfferWithId = { ...newOffer, id: Date.now() };
    setOffers([...offers, newOfferWithId]);
    handleCloseAddModal();
  };

  const handleEditOffer = (editedOffer: NewOffer) => {
    const index = offers.findIndex((o) => o.id === editedOffer.id);
    if (index !== -1) {
      const updatedOffers = [...offers];
      updatedOffers[index] = editedOffer;
      setOffers(updatedOffers);
      handleCloseEditModal();
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className={styles.addButton}
        onClick={handleOpenAddModal}
      >
        Добавить оффер
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.clickPrice}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.modified}</TableCell>
                <TableCell>{row.clicks}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddOfferModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddOffer={handleAddOffer}
      />
      <EditOfferModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditOffer={handleEditOffer}
        selectedOffer={selectedOffer}
      />
    </div>
  );
}
