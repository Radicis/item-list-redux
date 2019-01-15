// @flow
import React from 'react';
import List from '@material-ui/core/List';
import ItemListItem from './ItemListItem';

type Props = {
  items: array,
  selectItem: () => void,
  removeItem: () => void,
  selectedItemId: string
};

const ItemList = (props: Props) => {
  const { selectItem, removeItem, items, selectedItemId } = props;
  return (
    <List dense>
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
};

export default ItemList;
