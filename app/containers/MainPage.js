// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';

import * as itemActions from '../actions/items';
import * as optionsActions from '../actions/options';

import ItemListContainer from './ItemList';
import ItemDisplayContainer from './ItemDisplay';
import SetOptions from '../dialogs/SetOptions';
import CreateNewItem from '../dialogs/CreateItem';

type Props = {
  createNewItem: () => void,
  updateOptions: () => void,
  classes: object
};

const styles = theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    background: '#424242',
    paddingTop: theme.spacing.unit * 2,
    overflow: 'hidden'
  },
  fullHeight: {
    height: '100%',
    overflow: 'hidden'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 2
  },
  fabOptions: {
    position: 'absolute',
    width: '36px',
    height: '30px',
    bottom: theme.spacing.unit * 10.5,
    right: theme.spacing.unit * 2
  }
});

class MainPage extends Component<Props> {
  props: Props;

  state = {
    dialogCreateNewOpen: false,
    dialogOptionsOpen: false
  };

  /**
   * Opens the create new dialog
   */
  openCreateNewDialog = () => {
    this.setState({
      dialogCreateNewOpen: true
    });
  };

  openOptionsDialog = () => {
    this.setState({
      dialogOptionsOpen: true
    });
  };

  /**
   * Closes the dialog
   */
  closeDialogs = () => {
    this.setState({
      dialogCreateNewOpen: false,
      dialogOptionsOpen: false
    });
  };

  /**
   * Creates a new item in the store/state
   * @param itemName - string name
   */
  createNewItem = itemName => {
    const { createNewItem } = this.props;
    createNewItem(itemName);
    this.closeDialogs();
  };

  setOptions = options => {
    const { updateOptions } = this.props;
    updateOptions(options);
    this.closeDialogs();
  };

  render() {
    const { classes } = this.props;
    const { dialogCreateNewOpen, dialogOptionsOpen } = this.state;
    return (
      <div className={classes.mainContainer}>
        <Grid
          container
          spacing={24}
          alignItems="stretch"
          className={classes.fullHeight}
        >

          <Grid item xs={4}>
            <ItemListContainer />
          </Grid>
          <Grid item xs={8}>
            <ItemDisplayContainer />
          </Grid>
        </Grid>

        <Fab
          color="primary"
          onClick={this.openOptionsDialog}
          className={classes.fabOptions}
        >
          <SettingsIcon />
        </Fab>
        <Fab
          color="primary"
          onClick={this.openCreateNewDialog}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>

        <CreateNewItem
          open={dialogCreateNewOpen}
          handleOk={this.createNewItem}
          handleClose={this.closeDialogs}
        />

        <SetOptions
          open={dialogOptionsOpen}
          handleOk={this.setOptions}
          handleClose={this.closeDialogs}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  palette: state.options.palette
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    _.assign({}, itemActions, optionsActions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
