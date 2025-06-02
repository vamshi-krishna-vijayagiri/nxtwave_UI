import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface ToastMessageProps {
  open: boolean;
  message: string;
  severity?: AlertColor;  // Can be 'success' | 'error' | 'warning' | 'info'
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  open,
  message,
  severity = 'success',
  onClose,
}) => {
  
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          fontSize: '16px',
          fontWeight: '500',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;