// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

type Props = {
  filterItems: array,
  filterItemsByType: () => void,
  resetFilters: () => void,
  types: array,
  isFiltered: boolean,
  filterType: string
};

class ListFilter extends Component<Props> {
  props: Props;

  render() {
    const {
      filterItems,
      filterItemsByType,
      types,
      filterType,
      isFiltered,
      resetFilters
    } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={16}>
        <Grid item xs={6}>
          <TextField
            autoFocus
            placeholder="Search.."
            onChange={filterItems}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            value={filterType || 'all'}
            fullWidth
            onChange={filterItemsByType}
          >
            <MenuItem value="all">All</MenuItem>
            {types.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={2}>
          <Button disabled={!isFiltered} onClick={resetFilters} size="small">
            <CancelIcon color="primary" />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default ListFilter;
