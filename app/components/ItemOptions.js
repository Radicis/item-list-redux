// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  item: {},
  updateItem: () => void
};

export default class ItemOptions extends Component<Props> {
  props: Props;

  state = {
    modes: ['javascript', 'sql', 'text']
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
    // const { modes } = this.state;
    const { item } = this.props;
    return (
      <Grid container>
        <Grid item xs={8}>
          <TextField
            id="title-input"
            fullWidth
            value={item.title}
            onChange={this.updateTitle}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            value={item.type || 'text'}
            onChange={this.updateType}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'text'}>Text</MenuItem>
            <MenuItem value={'mysql'}>Query</MenuItem>
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  }
}
