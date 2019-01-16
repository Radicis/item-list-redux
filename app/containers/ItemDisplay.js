// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
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
  classes: object,
  lightTheme: boolean,
  contentCollapsed: boolean
};

const styles = theme => ({
  root: {
    height: '100%'
  },
  fullHeight: {
    height: '100%',
    paddingTop: '10px'
  },
  contentContainer: {
    marginTop: '-15px',
    paddingBottom: '45px  !important',
    height: '100%'
  },
  itemOptions: {
    height: '0',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  itemOptionsOpen: {
    height: '60px',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  grow: {
    flexGrow: 1
  }
});

class ItemDisplayContainer extends Component<Props> {
  props: Props;

  state = {
    aceDarkTheme: 'monokai',
    aceLightTheme: 'github'
  };

  render() {
    const {
      classes,
      item,
      updateItem,
      lightTheme,
      contentCollapsed
    } = this.props;
    const { aceDarkTheme, aceLightTheme } = this.state;
    return (
      <div className={classes.root}>
        {!_.isEmpty(item) ? (
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="stretch"
            className={classes.fullHeight}
          >
            <Grid
              item
              container
              xs={12}
              className={classNames(classes.itemOptions, {
                [classes.itemOptionsOpen]: !contentCollapsed
              })}
            >
              <Grid item xs={12}>
                <ItemOptions item={item} updateItem={updateItem} />
              </Grid>
            </Grid>

            <Grid item className={classes.contentContainer} xs={12}>
              <ItemContents
                item={item}
                aceTheme={lightTheme ? aceLightTheme : aceDarkTheme}
                updateItem={updateItem}
              />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.items.item,
  lightTheme: state.options.lightTheme,
  contentCollapsed: state.options.contentCollapsed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(itemActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ItemDisplayContainer));
