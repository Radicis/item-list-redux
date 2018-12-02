// @flow
import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

type Props = {
  item: object,
  selectItem: () => void
};

export default class ItemListItem extends Component<Props> {
  props: Props;

  render() {
    const {
      item,
      selectItem
    } = this.props;
    return (
      <div>
      <ListItem button onClick={() => selectItem(item)}>
        <ListItemText primary={item.title} />
      </ListItem>
    </div>
    );
  }
}
