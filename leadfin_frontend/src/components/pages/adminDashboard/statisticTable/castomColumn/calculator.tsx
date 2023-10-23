import React from 'react';
import { Button, Grid } from '@mui/material';

interface CalculatorProps {
    onInput: (value: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onInput }) => {
    return (
        <Grid container spacing={1}>
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '+', '-', '*', '/', 'C'].map((value) => (
                <Grid item xs={4} key={value}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => onInput(value)}
                    >
                        {value}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
}

export default Calculator;
