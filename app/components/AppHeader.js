// @flow
import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import _ from "lodash";
import connect from "react-redux/es/connect/connect";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import ArrowRight from '@material-ui/icons/ArrowForward';
import Settings from '@material-ui/icons/Settings';

import * as itemActions from '../actions/items';
import * as optionsActions from '../actions/options';

import CreateNewItem from "../dialogs/CreateItem";
import SetOptions from "../dialogs/SetOptions";

const styles = () => ({
  grow: {
    flexGrow: 1
  },
});

type Props = {
  createNewItem: () => void,
  updateOptions: () => void,
  showExport: () => void,
  toggleMenuCollapse: () => void,
  lightTheme: boolean,
  menuCollapsed: boolean,
  classes: object
};


class AppHeader extends Component<Props> {
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

  /**
   * Updates the options
   * @param options
   */
  setOptions = options => {
    const { updateOptions } = this.props;
    updateOptions(options);
    this.closeDialogs();
  };

  render() {
    const { classes, lightTheme, showExport, menuCollapsed, toggleMenuCollapse } = this.props;
    const { dialogCreateNewOpen, dialogOptionsOpen } = this.state;
    return (
      <div>
        <AppBar position="sticky" color="default" style={{WebkitAppRegion: 'drag'}}>
          <Toolbar>
            <IconButton onClick={toggleMenuCollapse} color="inherit" aria-label="Menu">
              {(menuCollapsed) ? ( <ArrowRight />) : ( <ArrowLeft />)}
            </IconButton>
            <Typography variant="title" className={classes.grow}>Thing Storerer!</Typography>
            <IconButton color="default" onClick={this.openCreateNewDialog}>
              <AddCircleRounded/>
            </IconButton>
            <IconButton color="default" onClick={this.openOptionsDialog}>
              <Settings/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <CreateNewItem
          open={dialogCreateNewOpen}
          handleOk={this.createNewItem}
          handleClose={this.closeDialogs}
        />

        <SetOptions
          lightTheme={lightTheme}
          open={dialogOptionsOpen}
          handleOk={this.setOptions}
          handleClose={this.closeDialogs}
          handleExport={showExport}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  lightTheme: state.options.lightTheme,
  menuCollapsed: state.options.menuCollapsed
});

const mapDispatchToProps = (dispatch) => (bindActionCreators(_.assign({}, itemActions, optionsActions), dispatch));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppHeader));
