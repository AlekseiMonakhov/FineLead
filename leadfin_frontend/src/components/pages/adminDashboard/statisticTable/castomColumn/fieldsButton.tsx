import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface FieldsButtonProps {
    onSelectField: (field: string) => void;
}

const fields = [
     'Hosts', 'Clicks', 'Income', 'Trafficback'
];

const FieldsButton: React.FC<FieldsButtonProps> = ({ onSelectField }) => {
    return (
        <ButtonGroup variant="contained" fullWidth>
            {fields.map((field) => (
                <Button key={field} onClick={() => onSelectField(field)}>{field}</Button>
            ))}
        </ButtonGroup>
    );
}

export default FieldsButton;
