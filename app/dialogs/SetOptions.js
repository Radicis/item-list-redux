// @flow
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

type Props = {
  open: boolean,
  handleClose: () => void,
  handleOk: () => void
};

export default class SetOptions extends Component<Props> {
  props: Props;

  state = {
    newItemName: ''
  };

  /**
   * Updates the state when the text input changes
   * @param event
   */
  handleNameChange = event => {
    this.setState({
      newItemName: event.target.value
    });
  };

  render() {
    const { open, handleClose, handleOk } = this.props;
    const { newItemName } = this.state;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Options</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Name"
            value={newItemName}
            onChange={this.handleNameChange}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!newItemName}
            onClick={() => handleOk(newItemName)}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}