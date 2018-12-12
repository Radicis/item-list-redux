// @flow
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverSharp';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';

type Props = {
  item: object,
  selected: boolean,
  selectItem: () => void,
  removeItem: () => void
};

const ItemListItem = (props: Props) => {
  const {item, selectItem, removeItem, selected} = props;
  return (
    <ListItem button selected={selected} onClick={() => selectItem(item)}>
      <Avatar>
        {!item.type || item.type === 'text' ? (
          <TextFieldsIcon/>
        ) : (
          <CodeIcon/>
        )}
      </Avatar>
      <ListItemText
        primary={item.title}
        secondary={!item.type || item.type === 'text' ? '' : item.type}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={() => removeItem(item.id)}>
          <DeleteForeverOutlinedIcon style={{fontSize: 20}}/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ItemListItem;
