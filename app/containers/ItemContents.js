// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as itemActions from '../../actions/items';

import ItemContents from '../components/ItemContents';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemContents extends Component<Props> {
  props: Props;

  /**
   * Dispatch the item update action to update the item int he store and state
   * @param value - string value
   */
  updateContent = value => {
    const { updateItem, item } = this.props;
    const updatedItem = { content: value };
    updateItem(item.id, updatedItem);
  };

  render() {
    const { item } = this.props;
    return (
     <ItemContents
      item={item}
      updateContent={this.updateContent}
     />
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.items.item
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemContents);
