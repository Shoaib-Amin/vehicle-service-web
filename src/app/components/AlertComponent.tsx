import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';

type AlertComponentProps = {
    open: boolean;
    onClose: () => void;
    message: string;
    autoHideDuration?: number;
    severity: AlertColor; // Type of the alert (error, warning, etc.)
};

const AlertComponent: React.FC<AlertComponentProps> = ({ open, onClose, message, severity, autoHideDuration = 6000 }) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
            <Alert onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertComponent;
