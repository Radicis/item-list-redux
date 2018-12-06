// @flow
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  item: object,
  selectItem: () => void,
  removeItem: () => void
};

const ItemListItem = (props: Props) => {
  const {
    item,
    selectItem,
    removeItem
  } = props;
  return (
    <div>
      <ListItem button onClick={() => selectItem(item)}>
        <ListItemText primary={item.title}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => removeItem(item.id)}>
            <DeleteIcon style={{fontSize: 20}}/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default ItemListItem;

