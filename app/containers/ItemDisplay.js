// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import * as itemActions from '../actions/items';

import ItemContents from '../components/ItemContents';
import ItemOptions from '../components/ItemOptions';

type Props = {
  item: object,
  updateItem: () => void,
  classes: object
};

const styles = () => ({
  fullHeight: {
    height: '100%',
    paddingBottom: '45px !important' // gets overwritten
  },
});

class ItemDisplayContainer extends Component<Props> {
  props: Props;

  state = {
    aceTheme: 'monokai'
  };

  render() {
    const { classes, item, updateItem } = this.props;
    const { aceTheme } = this.state;
    if (!_.isEmpty(item)) {
      return (
        <Grid container spacing={24} direction="row" alignItems="stretch" className={classes.fullHeight}>
          <Grid item xs={12}>
            <ItemOptions item={item} updateItem={updateItem} />
          </Grid>
          <Grid item className={classes.fullHeight} xs={12}>
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
)(withStyles(styles)(ItemDisplayContainer));
