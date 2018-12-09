// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';

import * as itemActions from '../actions/items';

import ItemListContainer from './ItemList';
import ItemDisplayContainer from './ItemDisplay';
import SetOptions from '../dialogs/SetOptions';
import CreateNewItem from '../dialogs/CreateItem';

type Props = {
  createNewItem: () => void,
  classes: {}
};

const styles = theme => ({
  mainContainer: {
    height: '100%' // allow for draggale header
  },
  title: {
    padding: '5px 10px',
    fontFamily: 'Roboto, sans-serif',
    background: '#424242',
    color: '#ccc',
    WebkitAppRegion: 'drag'
  },
  paper: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: 0
  },
  grid: {
    height: '100%',
    overflow: 'hidden'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2.5,
    right: theme.spacing.unit * 2
  },
  fabOptions: {
    position: 'absolute',
    width: '36px',
    height: '30px',
    bottom: theme.spacing.unit * 10,
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

  render() {
    const { classes } = this.props;
    const { dialogCreateNewOpen, dialogOptionsOpen } = this.state;
    return (
      <div className={classes.mainContainer}>
        <div className={classes.title}>:The Thing Storerer: </div>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={24}
            alignItems="stretch"
            className={classes.grid}
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
        </Paper>

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

const mapStateToProps = state => ({}); // needs to be here although not used

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
