// @flow
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

type Props = {
  open: boolean,
  itemId: string,
  handleClose: () => void,
  handleOk: () => void
};

const DeleteConfirm = (props: Props) => {
  const {
    open,
    itemId,
    handleClose,
    handleOk
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Really Delete?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleOk(itemId)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
