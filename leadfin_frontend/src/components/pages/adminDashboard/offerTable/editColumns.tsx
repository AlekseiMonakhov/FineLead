import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './editColumns.module.css';

interface EditColumnsProps {
    open: boolean;
    columns: Record<string, boolean>;
    onClose: () => void;
    onColumnChange: (selectedColumns: Record<string, boolean>) => void;
}

const EditColumns: React.FC<EditColumnsProps> = ({ open, columns, onClose, onColumnChange }) => {
    const [selectedColumns, setSelectedColumns] = useState(columns);

    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        const allSelected = Object.values(selectedColumns).every((value) => value);
        setSelectAll(allSelected);
    }, [selectedColumns]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = { ...selectedColumns, [column]: !selectedColumns[column] };
        setSelectedColumns(updatedColumns);
    };

    const handleSelectAllChange = () => {
        const updatedColumns: Record<string, boolean> = {};
        for (const column of Object.keys(selectedColumns)) {
            updatedColumns[column] = !selectAll;
        }
        setSelectedColumns(updatedColumns);
        setSelectAll(!selectAll);
    };

    const handleApply = () => {
        onColumnChange(selectedColumns);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className={styles.modalContainer}>
                <h2>Отображать столбцы</h2>
                <FormControlLabel
                    control={
                        <Checkbox
                            className={styles.checkbox}
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                    }
                    label="Все"
                />
                <div className={styles.checkboxContainer}>
                    {Object.keys(columns).map((column) => (
                        <FormControlLabel
                            key={column}
                            className={styles.checkbox}
                            control={<Checkbox checked={selectedColumns[column]} onChange={() => handleColumnChange(column)} />}
                            label={column}
                        />
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={handleApply} className={styles.button}>
                        Применить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditColumns;
