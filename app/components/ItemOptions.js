// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';
import TextField from '@material-ui/core';
// import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import * as itemActions from '../actions/items';

type Props = {
  item: {},
  updateItem: () => void
};

class ItemDisplayOptions extends Component<Props> {
  props: Props;

  state = {
    // modes: ['javascript', 'sql', 'text']
  };

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
    // const { modes } = this.state;
    // const { item } = this.props;
      return (
        <Grid container>
          <Grid item xs={6}>
            <TextField
              label="Dense"
              margin="dense"
              onChange={this.updateContent}
            />
          </Grid>
        </Grid>
      );
    }
}

const mapStateToProps = state => ({
  item: state.items.item
});

const mapDispatchToProps = dispatch => {
  bindActionCreators(itemActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDisplayOptions);
