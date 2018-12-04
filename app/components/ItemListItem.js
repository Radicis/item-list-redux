// @flow
import React, { Component } from 'react';
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

export default class ItemListItem extends Component<Props> {
  props: Props;

  render() {
    const {
      item,
      selectItem,
      removeItem
    } = this.props;
    return (
      <div>
      <ListItem button onClick={() => selectItem(item)}>
        <ListItemText primary={item.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => removeItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
    );
  }
}
