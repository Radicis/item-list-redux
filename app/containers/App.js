// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';

import classNames from 'classnames';

import AppHeader from '../components/AppHeader';
import * as OptionsActions from '../actions/options';
import * as ItemActions from '../actions/items';
import ItemList from './ItemList';

const drawerWidth = 400;

const styles = theme => ({
  fullHeight: {
    height: '100%'
  },
  mainContainer: {
    height: 'calc(100% - 96px)',
    overflow: 'hidden',
    borderRadius: 0
  },
  root: {
    display: 'flex',
    height: 'calc(100% + 80px)',
    overflow: 'hidden',
    borderRadius: 0,
    backgroundColor: '#424242'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    padding: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

type Props = {
  lightTheme: boolean,
  getOptionsFromStore: () => void,
  updateOptions: () => void,
  toggleMenuCollapse: () => void,
  toggleContentCollapse: () => void,
  createNewItem: () => void,
  menuCollapsed: boolean,
  showExport: () => void,
  children: React.Node,
  item: object,
  classes: object
};

const primary = {
  light: '#039de2',
  main: '#607D8B',
  dark: '#455A64',
  contrastText: '#212121'
};

const secondary = {
  light: '#89e9ff',
  main: '#03A9F4',
  dark: '#026a99',
  contrastText: '#fff'
};

class App extends Component<Props> {
  props: Props;

  state = {
    theme: createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        type: 'light',
        primary,
        secondary
      }
    })
  };

  componentWillMount() {
    const { getOptionsFromStore, lightTheme } = this.props;
    getOptionsFromStore();
    const updatedTheme = {
      typography: {
        useNextVariants: true
      },
      palette: {
        type: lightTheme ? 'light' : 'dark',
        primary,
        secondary
      }
    };
    this.setState({
      theme: createMuiTheme(updatedTheme)
    });
  }

  componentDidUpdate() {
    const { lightTheme } = this.props;
    const { theme } = this.state;

    const updatedType = lightTheme ? 'light' : 'dark';

    const updatedTheme = createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        type: updatedType,
        primary,
        secondary
      }
    });
    if (theme.palette.type !== updatedType) {
      this.setState({
        theme: createMuiTheme(updatedTheme)
      });
    }
  }

  render() {
    const {
      classes,
      children,
      updateOptions,
      toggleMenuCollapse,
      toggleContentCollapse,
      createNewItem,
      menuCollapsed,
      showExport,
      lightTheme,
      item
    } = this.props;
    const { theme } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppHeader
            createNewItem={createNewItem}
            updateOptions={updateOptions}
            showExport={showExport}
            menuCollapsed={menuCollapsed}
            toggleMenuCollapse={toggleMenuCollapse}
            toggleContentCollapse={toggleContentCollapse}
            lightTheme={lightTheme}
            hasSelectedItem={!_.isEmpty(item)}
          />

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={!menuCollapsed}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <ItemList />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: !menuCollapsed
            })}
          >
            <div className={classes.drawerHeader} />
            <Paper className={classes.mainContainer}>
              <React.Fragment>{children}</React.Fragment>
            </Paper>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  lightTheme: state.options.lightTheme,
  menuCollapsed: state.options.menuCollapsed,
  item: state.items.item
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(_.assign({}, OptionsActions, ItemActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
