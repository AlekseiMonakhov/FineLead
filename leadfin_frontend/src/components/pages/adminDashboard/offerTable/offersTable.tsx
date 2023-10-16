import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './offersTable.module.css';
import { dataFromDatabase } from './mockData';
import TableHeader from './tableHeader';
import EditColumns from './editColumns';

const columnsMapping: Record<string, keyof typeof dataFromDatabase[0]> = {
  'ID': 'id',
  'Название': 'name',
  'Категории': 'categories',
  'Рекламодатель': 'client',
  'Вебмастер': 'webmaster',
  'Статус': 'status',
  'Уровень приватности': 'privateLevel',
  'CR за неделю': 'weekCr',
  'Кэп': 'cap',
  'Дневной лимит': 'dailyLimit',
  'Общий лимит': 'totalLimit',
  'За сегодня': 'today',
  'Выплата': 'payment',
  'Доход': 'income',
  'Заметки': 'notes'
};

const initialColumns: Record<string, boolean> = {
  'ID': true,
  'Название': true,
  'Категории': true,
  'Рекламодатель': true,
  'Вебмастер': true,
  'Статус': true,
  'Уровень приватности': true,
  'CR за неделю': true,
  'Кэп': true,
  'Дневной лимит': true,
  'Общий лимит': true,
  'За сегодня': true,
  'Выплата': true,
  'Доход': true,
  'Заметки': true
};

export default function OffersTable() {
  const [offers, setOffers] = useState(dataFromDatabase);
  const [columns, setColumns] = useState<Record<string, boolean>>(initialColumns);
  const [editColumnsOpen, setEditColumnsOpen] = useState(false);

  const numberOfOffers = dataFromDatabase.length;

  const handleColumnChange = (selectedColumns: Record<string, boolean>) => {
    setColumns(selectedColumns);
  };

  return (
    <div className={styles.container}>
      <TableHeader
        numberOfOffers={numberOfOffers}
        onEditColumns={() => setEditColumnsOpen(true)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(columns).map((column) => (
                columns[column] && (
                  <TableCell key={column}>{column}</TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(columns).map((column) => (
                  columns[column] && (
                    <TableCell key={column}>
                      {row[columnsMapping[column]]}
                    </TableCell>
                  )
                ))}
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
    </div>
  );
}
