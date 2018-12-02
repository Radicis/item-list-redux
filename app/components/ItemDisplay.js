// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/items';

type Props = {
  item: object,
  createNewItem: () => void,
};

class ItemDisplay extends Component<Props> {
  props: Props;

  render() {
    const { item, createNewItem } = this.props;
    return (
      <div>
        { item.title }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    item: state.items.item
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDisplay);
