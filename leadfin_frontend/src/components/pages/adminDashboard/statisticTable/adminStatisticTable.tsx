import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './adminStatisticTable.module.css';
import { dataFromDatabase } from './mockData';

interface ColumnData {
  [key: string]: string;
}

interface DataItem {
  Day: string;
  Traffic: ColumnData;
  Views: ColumnData;
  'Status "Accepted"': ColumnData;
  'Status "Hold"': ColumnData;
  'Status "In Process"': ColumnData;
  'Status "Rejected"': ColumnData;
  CR: string;
  ERC: string;
  ECPM: string;
  Total: ColumnData;
}

const columnsMapping: Record<string, keyof DataItem> = {
  'День': 'Day',
  'Трафик': 'Traffic',
  'Просмотры': 'Views',
  'Статус "принято"': 'Status "Accepted"',
  'Статус "холд"': 'Status "Hold"',
  'Статус "в обработке"': 'Status "In Process"',
  'Статус "отклонено"': 'Status "Rejected"',
  'CR': 'CR',
  'ERC': 'ERC',
  'ECPM': 'ECPM',
  'Всего': 'Total',
};

export default function AdminStatisticTable() {
  const headerColumns = Object.keys(columnsMapping);

  // Функция для рендера подколонок в хедере
  const renderSubColumnsInHeader = (subColumns: ColumnData) => {
    return Object.keys(subColumns).map((subColumn) => (
      <TableCell key={subColumn}>
        {subColumn}
      </TableCell>
    ));
  };

  // Функция для рендера подколонок в таблице
  const renderSubColumnsInTable = (subColumns: ColumnData) => {
    return Object.keys(subColumns).map((subColumn) => (
      <TableCell key={subColumn}>
        {subColumns[subColumn]}
      </TableCell>
    ));
  };

  const tableHead = (
    <TableHead>
      <TableRow>
        {headerColumns.map((column) => {
          const dataKey = columnsMapping[column];
          const cellData = dataFromDatabase[0][dataKey];

          return (
            <TableCell key={column} colSpan={typeof cellData === 'object' ? Object.keys(cellData).length : 1}>
              <strong>{column}</strong>
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        {headerColumns.map((column) => {
          const dataKey = columnsMapping[column];
          const cellData = dataFromDatabase[0][dataKey];

          if (typeof cellData === 'object') {
            return renderSubColumnsInHeader(cellData);
          } else {
            return <TableCell />;
          }
        })}
      </TableRow>
    </TableHead>
  );

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          {tableHead}
          <TableBody>
            {dataFromDatabase.map((row, index) => (
              <TableRow key={index}>
                {headerColumns.map((column) => {
                  const dataKey = columnsMapping[column];
                  const cellData = row[dataKey];

                  if (typeof cellData === 'object') {
                    return renderSubColumnsInTable(cellData);
                  } else {
                    return <TableCell>{cellData}</TableCell>;
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
