// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import routes from '../constants/routes';

import ItemListItem from './ItemListItem';
import * as itemActions from '../actions/items';

import Button from '@material-ui/core/Button';

type Props = {
  items: array,
  itemCount: number,
  selectItem: () => void,
  setItems: () => void,
  createNewItem: () => void,
};

class ItemList extends Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.setItems();
  }

  render() {
    const {
      items,
      selectItem
      createNewItem
    } = this.props;
    return (
      <List component="nav">
      <Button variant="contained" onClick={createNewItem}>Create New</Button>
        {items.map((item, index) => {
          return <ItemListItem key={index} item={item} selectItem={selectItem}></ItemListItem>;
        })}
    </List>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    items: state.items.items,
    itemCount: state.items.items.length
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
