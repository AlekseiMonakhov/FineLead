import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './clientsTable.module.css';
import { columns, dataFromDatabase } from './mockData';
import TableHeader from './tableHeader'

export default function ClientsTable() {
  const [clients, setClients] = useState(dataFromDatabase);

  const numberOfClients = dataFromDatabase.length;

  return (
    <div className={styles.container}>
      <TableHeader numberOfClients={numberOfClients} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.contactPerson}</TableCell>
                <TableCell>{row.commMethod}</TableCell>
                <TableCell>{row.manager}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.offers}</TableCell>
                <TableCell>{row.cap}</TableCell>
                <TableCell>{row.dailyLimit}</TableCell>
                <TableCell>{row.totalLimit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
