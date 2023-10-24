import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './adminStatisticTable.module.css';
import { dataFromDatabase } from '../mockData';
import { ColumnData } from '../interfaces';
import { columnsMapping, subColumnsMapper } from '../mappers';
import TableHeader from '../tableHeader/tableHeader';
import EditColumns from '../../../../UI/editColumnsModal/editColumns';

type ColumnDetailsType = {
  name: string;
  formula: string;
};

export default function AdminStatisticTable() {
  const headerColumns = Object.keys(columnsMapping);
  const initialColumnsState: Record<string, boolean> = {};
  headerColumns.forEach((column) => {
    initialColumnsState[column] = true;
  });

  const [columns, setColumns] = useState(initialColumnsState);
  const [editColumnsOpen, setEditColumnsOpen] = useState(false);
  const [customColumns, setCustomColumns] = useState<ColumnDetailsType[]>([]);

  const handleAddCustomColumn = (columnDetails: ColumnDetailsType) => {
    setCustomColumns(prev => [...prev, columnDetails]);
  };

  const computeSum = (dataKey: string, subColumn?: string) => {
    return dataFromDatabase.reduce((sum, row) => {
      const value = row[dataKey as keyof typeof row];
      if (typeof value === 'object' && subColumn) {
        return sum + (value[subColumn as keyof typeof value] || 0);
      } else if (!subColumn) {
        return sum + (value as number || 0);
      }
      return sum;
    }, 0);
  };

  const renderSubColumnsInHeader = (subColumns: ColumnData) => {
    return Object.keys(subColumns).map((subColumn) => (
      <TableCell key={subColumn}>
        {subColumnsMapper[subColumn] || subColumn}
      </TableCell>
    ));
  };

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
            columns[column] && (
              <TableCell key={column} colSpan={typeof cellData === 'object' ? Object.keys(cellData).length : 1}>
                <strong>{column}</strong>
              </TableCell>
            )
          );
        })}
      </TableRow>
      <TableRow>
        {headerColumns.map((column) => {
          const dataKey = columnsMapping[column];
          const cellData = dataFromDatabase[0][dataKey];
          if (typeof cellData === 'object') {
            return columns[column] && (
              renderSubColumnsInHeader(cellData)
            );
          } else {
            return columns[column] && <TableCell />;
          }
        })}
      </TableRow>
    </TableHead>
  );

  return (
    <div className={styles.container}>
      <TableHeader
        onEditColumns={() => setEditColumnsOpen(true)}
        onAddCustomColumn={handleAddCustomColumn}
      />
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          {tableHead}
          <TableBody>
            {dataFromDatabase.map((row, index) => (
              <TableRow key={index}>
                {headerColumns.map((column) => {
                  const dataKey = columnsMapping[column];
                  const cellData = row[dataKey];
                  return (
                    columns[column] && (
                      typeof cellData === 'object' 
                      ? renderSubColumnsInTable(cellData) 
                      : <TableCell>{cellData}</TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
            <TableRow className={styles['sum-row']}>
              {headerColumns.map((column) => {
                const dataKey = columnsMapping[column];
                if (!columns[column]) return null;
                if (column === "День") {
                  return <TableCell>Всего на странице</TableCell>;
                }
                const cellData = dataFromDatabase[0][dataKey];
                if (typeof cellData === 'object') {
                  return Object.keys(cellData).map((subColumn) => (
                    <TableCell>{computeSum(dataKey, subColumn)}</TableCell>
                  ));
                } else {
                  return <TableCell>{computeSum(dataKey)}</TableCell>;
                }
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <EditColumns
        open={editColumnsOpen}
        columns={columns}
        onClose={() => setEditColumnsOpen(false)}
        onColumnChange={(selectedColumns) => setColumns(selectedColumns)}
      />
    </div>
  );
}
