// @flow
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  search: {
    border: 0,
    margin: 10
  }
});

type Props = {
  filterItems: () => void,
  classes: {}
};

const ListFilter = (props: Props) => {
  const { classes, filterItems } = props;

  return (
    <TextField
      autoFocus
      className={classes.search}
      placeholder="Search.."
      margin="dense"
      variant="outlined"
      fullWidth
      onChange={filterItems}
    />
  );
};

export default withStyles(styles)(ListFilter);
