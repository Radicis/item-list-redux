// @flow
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  open: boolean,
  lightTheme: boolean,
  handleClose: () => void,
  handleOk: () => void
};

class SetOptions extends Component<Props> {
  props: Props;

  state = {
    lightTheme: false
  };

  /**
   * Updates the state when the text input changes
   * @param event
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    const { open, handleClose, handleOk } = this.props;
    const { lightTheme } = this.state;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Options</DialogTitle>
        <DialogContent>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={lightTheme}
                  onChange={this.handleChange('lightTheme')}
                  value="light"
                />
              }
              label="Vlad Mode"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleOk({ type: lightTheme ? 'light' : 'dark' })} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SetOptions;
