// @flow
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import ItemListItem from './ItemListItem';

type Props = {
  item: object,
  selected: boolean,
  selectItem: () => void,
  removeItem: () => void
};

class ItemListItemChildren extends Component<Props> {
  props: Props;

  state = {
    open: true
  };

  render() {
    const { item, selectItem, removeItem, selected } = this.props;
    const { open } = this.state;
    return (
      <div>
        <ListItem button>
          <ListItemText inset primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ItemListItem
              selected={selected}
              key={item.id}
              item={item}
              selectItem={selectItem}
              removeItem={removeItem}
            />
          </List>
        </Collapse>
      </div>
    );
  }
}

export default ItemListItemChildren;
