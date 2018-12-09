// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  filterField: {
    padding: '15px'
  }
});

type Props = {
  items: array,
  filterItemsByType: () => void,
  types: array,
  filterType: string,
  classes: object
};

class ListFilter extends Component<Props> {
  props: Props;

  render() {
    const { classes, filterItems, filterItemsByType, types, filterType } = this.props;
    return (
      <Grid container>
        <Grid item xs={6} className={classes.filterField}>
          <TextField
            autoFocus
            placeholder="Search.."
            fullWidth
            onChange={filterItems}
          />
        </Grid>
        <Grid item xs={6} className={classes.filterField}>
          <Select value={filterType || 'all'} onChange={filterItemsByType} fullWidth>
            <MenuItem value="all">All</MenuItem>
            {types.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ListFilter);
