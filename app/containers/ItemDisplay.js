// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

import * as itemActions from '../actions/items';

import ItemContents from '../components/ItemContents';
import ItemOptions from '../components/ItemOptions';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemDisplay extends Component<Props> {
  props: Props;

  state = {
    aceTheme: 'monokai'
  };

  render() {
    const { item, updateItem } = this.props;
    const { aceTheme } = this.state;
    if (item) {
      return (
        <Grid container>
          <Grid item xs={12}>
          <ItemOptions
              item={item}
              updateItem={updateItem}
            />
          </Grid>
          <Grid item xs={12}>
            <ItemContents
              item={item}
              aceTheme={aceTheme}
              updateItem={updateItem}
            />
          </Grid>
        </Grid>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    item: state.items.item
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(itemActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDisplay);
