import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './offersTable.module.css';
import { dataFromDatabase } from '../mockData';
import TableHeader from '../tableHeader/tableHeader';
import EditColumns from '../editColumns/editColumns';
import { columnsMapping } from '../mappers';
import { OfferData } from '../interfaces';

const initialColumns: Record<string, boolean> = {
  'ID': true,
  'Название': true,
  'Категории': true,
  'Рекламодатель': true,
  'Статус': true,
  'Уровень приватности': true,
  'CR за неделю': true,
  'Дневной лимит': true,
  'Общий лимит': true,
  'За сегодня': true,
  'Выплата': true,
  'Доход': true,
  'Заметки': true,
};

export default function OffersTable() {
  const [offers, setOffers] = useState(dataFromDatabase);
  const [columns, setColumns] = useState<Record<string, boolean>>(initialColumns);
  const [editColumnsOpen, setEditColumnsOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const numberOfOffers = dataFromDatabase.length;

  const handleColumnChange = (selectedColumns: Record<string, boolean>) => {
    setColumns(selectedColumns);
  };

  const handleStatistics = (row: OfferData) => {};

  const openEditModal = (row: OfferData) => {
    setSelectedOffer(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedOffer(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <TableHeader
        numberOfOffers={numberOfOffers}
        onEditColumns={() => setEditColumnsOpen(true)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {Object.keys(columns).map((column) =>
                columns[column] && <TableCell key={column}>{column}</TableCell>
              )}
              <TableCell className={styles.tableHeader}></TableCell> {/* Применён стиль tableHeader к этой ячейке */}
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(columns).map((column) =>
                  columns[column] && (
                    <TableCell key={column}>
                      {row[columnsMapping[column]]}
                    </TableCell>
                  )
                )}
                <TableCell className={styles.tableHeader}>
                  <div>
                    <Tooltip title="Статистика по офферу">
                      <IconButton onClick={() => handleStatistics(row)}>
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать оффер">
                      <IconButton onClick={() => openEditModal(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditColumns
        open={editColumnsOpen}
        columns={columns}
        onClose={() => setEditColumnsOpen(false)}
        onColumnChange={handleColumnChange}
      />
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <div className={styles.editModal}>
          <h2>Edit Offer</h2>
          <Button onClick={closeEditModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}
