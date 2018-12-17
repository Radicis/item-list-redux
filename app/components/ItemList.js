// @flow
import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ItemListItem from './ItemListItem';
import ItemListItemChildren from './ItemListItemChildren';

const styles = () => ({
  list: {}
});

type Props = {
  items: array,
  selectItem: () => void,
  removeItem: () => void,
  classes: object,
  selectedItemId: string
};

const ItemList = (props: Props) => {
  const { selectItem, classes, removeItem, items, selectedItemId } = props;
  return (
    <List className={classes.list} dense>
      {items.map(item =>
        item.children ? (
          <ItemListItemChildren
            selected={selectedItemId === item.id}
            key={item.id}
            item={item}
            selectItem={selectItem}
            removeItem={removeItem}
          />
        ) : (
          <ItemListItem
            selected={selectedItemId === item.id}
            key={item.id}
            item={item}
            selectItem={selectItem}
            removeItem={removeItem}
          />
        )
      )}
    </List>
  );
};

export default withStyles(styles)(ItemList);
