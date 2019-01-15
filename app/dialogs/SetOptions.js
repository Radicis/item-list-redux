// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

type Props = {
  open: boolean,
  lightTheme: boolean,
  handleClose: () => void,
  handleOk: () => void,
  handleExport: () => void,
  classes: object
};

class SetOptions extends Component<Props> {
  props: Props;

  state = {
    localLightTheme: false
  };

  componentWillMount() {
    const { lightTheme } = this.props;
    this.setState({
      localLightTheme: lightTheme
    });
  }

  /**
   * Updates the state when the text input changes
   * @param name
   * @returns {Function}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    const { classes, open, handleClose, handleOk, handleExport } = this.props;
    const { localLightTheme } = this.state;
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
                  checked={localLightTheme}
                  onChange={this.handleChange('localLightTheme')}
                  value="light"
                />
              }
              label="Vlad Mode"
            />
          </FormGroup>

          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleExport}
          >
            <CloudUploadIcon className={classes.leftIcon} />
            Export
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleOk(localLightTheme)} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SetOptions);
