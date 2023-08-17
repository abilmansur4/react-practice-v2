import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({open, onClose, severity, message}) => {

  return (
    <Snackbar 
      anchorOrigin={{ 
        vertical: 'top',
        horizontal: 'center'
      }}
      open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
};

export default SnackbarComponent;
