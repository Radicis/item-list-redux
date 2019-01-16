// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import Settings from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import CreateNewItem from '../dialogs/CreateItem';
import SetOptions from '../dialogs/SetOptions';

const drawerWidth = 400;

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 10
  },
  hide: {
    display: 'none'
  },
  subHeading: {
    fontSize: 12,
    opacity: 0.5
  },
  borderIcon: {
    borderRadius: 12,
    border: '1px solid #999'
  }
});

type Props = {
  createNewItem: () => void,
  updateOptions: () => void,
  showExport: () => void,
  toggleContentCollapse: () => void,
  toggleMenuCollapse: () => void,
  lightTheme: boolean,
  menuCollapsed: boolean,
  hasSelectedItem: boolean,
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
    const {
      classes,
      lightTheme,
      showExport,
      menuCollapsed,
      toggleMenuCollapse,
      toggleContentCollapse,
      hasSelectedItem
    } = this.props;
    const { dialogCreateNewOpen, dialogOptionsOpen } = this.state;
    return (
      <div>
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: !menuCollapsed
          })}
        >
          <Toolbar>
            <IconButton
              onClick={toggleMenuCollapse}
              className={classes.menuButton}
              color="default"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="default" className={classes.grow}>
              Thing Storerer <span className={classes.subHeading}>v1.1.0</span>
            </Typography>

            <Tooltip title="Item Info" placement="bottom">
              <IconButton
                color="secondary"
                onClick={toggleContentCollapse}
                disabled={!hasSelectedItem}
              >
                <InfoIcon className={classes.borderIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Item" placement="bottom">
              <IconButton color="default" onClick={this.openCreateNewDialog}>
                <AddCircleRounded className={classes.borderIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings" placement="bottom">
              <IconButton color="default" onClick={this.openOptionsDialog}>
                <Settings className={classes.borderIcon} />
              </IconButton>
            </Tooltip>
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
}

export default withStyles(styles)(AppHeader);
