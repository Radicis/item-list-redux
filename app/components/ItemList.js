// @flow
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ItemListItem from './ItemListItem';

const styles = () => ({
  list: {

  }
});

type Props = {
  items: array,
  selectItem: () => void,
  removeItem: () => void,
  classes: object,
  selectedItemId: string
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
