// @flow
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import ItemListItem from './ItemListItem';
import ListFilter from './ListFilter';

const styles = () => ({
  list: {
    height: 430,
    overflowY: 'auto',
    overflowX: 'hidden',
    marginRight: -20
  }
});

type Props = {
  items: array,
  selectItem: () => void,
  removeItem: () => void,
  classes: {}
};

class ItemList extends Component<Props> {
  props: Props;

  render() {
    const {
      selectItem,
      classes,
      removeItem,
      items,
      selectedItemId
    } = this.props;
    return (
      <List className={classes.list} dense>
        {items.map(item => (
          <ItemListItem
            selected={selectedItemId === item.id}
            key={item.id}
            item={item}
            selectItem={selectItem}
            removeItem={removeItem}
          />
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(ItemList);
