// @flow
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemOptions extends Component<Props> {
  props: Props;

  state = {
    modes: [
      'javascript',
      'mysql',
      'java',
      'text',
      'css',
      'html',
      'json',
      'kotlin',
      'yaml',
      'sh'
    ]
  };

  /**
   * Updates the title of an object
   */
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
    const { item } = this.props;
    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={7}>
          <TextField value={item.title} fullWidth onChange={this.updateTitle} />
        </Grid>
        <Grid item xs={4}>
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

export default ItemOptions;
