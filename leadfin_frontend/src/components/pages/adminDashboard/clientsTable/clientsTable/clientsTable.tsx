import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './clientsTable.module.css';
import { dataFromDatabase } from '../mockData';
import TableHeader from '../tableHeader/tableHeader';
import { columnsMapping } from '../mappers';
import EditColumns from '../../../../UI/editColumnsModal/editColumns';

const initialColumns: Record<string, boolean> = {
  'Имя компании': true,
  'email': true,
  'Контактное лицо': true,
  'Способ связи': true,
  'Менеджер': true,
  'Дата регистрации': true,
  'Офферы': true,
  'Кэп': true,
  'Дневной лимит': true,
  'Общий лимит': true,
};

export default function ClientsTable() {
  const [clients, setClients] = useState(dataFromDatabase);
  const [columns, setColumns] = useState<Record<string, boolean>>(initialColumns);
  const [editColumnsOpen, setEditColumnsOpen] = useState(false);

  const numberOfClients = dataFromDatabase.length;

  const handleColumnChange = (selectedColumns: Record<string, boolean>) => {
    setColumns(selectedColumns);
  };

  return (
    <div className={styles.container}>
      <TableHeader
        numberOfClients={numberOfClients}
        onEditColumns={() => setEditColumnsOpen(true)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {Object.keys(columns).map((column) => (
                columns[column] && (
                  <TableCell key={column}>{column}</TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((row) => (
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
