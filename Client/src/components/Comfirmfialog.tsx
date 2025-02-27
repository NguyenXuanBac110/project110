import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ComfirmDialogProps = {
  confirm: boolean;
  onComfirm: (comfirm: boolean) => void;
  onDelete: () => void;
}

export default function ComfirmDialog({ confirm, onComfirm, onDelete }: ComfirmDialogProps) {

  const handleClose = () => {
   onComfirm(false)
  };

  const handleAgree = () => {
    onComfirm(false)
    onDelete()
  };

  return (
    <React.Fragment>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}