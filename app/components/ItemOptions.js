// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  optionsContainer: {
    marginBottom: '-15px' // make the code editor line up with the list
  },
  optionsField: {
    padding: theme.spacing.unit * 2
  }
});

type Props = {
  item: object,
  updateItem: () => void
};

class ItemOptions extends Component<Props> {
  props: Props;

  state = {
    modes: ['javascript', 'mysql', 'java', 'text']
  };

  updateTitle = evt => {
    const { updateItem, item } = this.props;
    const updatedItem = { title: evt.target.value };
    updateItem(item.id, updatedItem);
  };

  /**
   * Updates the type of an item
   */
  updateType = evt => {
    const { updateItem, item } = this.props;
    const updatedItem = { type: evt.target.value };
    updateItem(item.id, updatedItem);
  };

  render() {
    const { modes } = this.state;
    const { classes, item } = this.props;
    return (
      <Grid container className={classes.optionsContainer}>
        <Grid item xs={8} className={classes.optionsField}>
          <TextField value={item.title} fullWidth onChange={this.updateTitle} />
        </Grid>
        <Grid item xs={4} className={classes.optionsField}>
          <Select
            value={item.type || 'text'}
            onChange={this.updateType}
            fullWidth
          >
            {modes.map(mode => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ItemOptions);
