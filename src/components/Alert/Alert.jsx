import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AlertSnackbar({ open, onClose, severity, message }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MuiAlert elevation={6} variant="filled" severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default AlertSnackbar;