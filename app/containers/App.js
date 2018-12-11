// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import _ from "lodash";
import * as optionsActions from "../actions/options";

import AppHeader from '../components/AppHeader';


type Props = {
  lightTheme: boolean,
  getOptionsFromStore: () => void,
  children: React.Node
};

const primary = {
  light: '#ffffff',
  main: '#e3f2fd',
  dark: '#b1bfca',
  contrastText: '#000000'
};

const secondary = {
  light: '#e6ffff',
  main: '#b3e5fc',
  dark: '#8b2b3c9',
  contrastText: '#000000'
};

class App extends Component<Props> {
  props: Props;

  state = {
    theme: createMuiTheme({
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
      palette: {
        type: lightTheme ? 'light' : 'dark',
        primary,
        secondary
      }
    };
    this.setState({
      theme: createMuiTheme(updatedTheme)
    })
  }

  componentDidUpdate() {
    const { lightTheme } = this.props;
    const { theme } = this.state;

    const updatedType = lightTheme ? 'light' : 'dark';

    const updatedTheme = createMuiTheme({
      palette: {
        type: updatedType,
        primary,
        secondary
      }
    });
    if (theme.palette.type !== updatedType) {
      this.setState({
        theme: createMuiTheme(updatedTheme)
      })
    }
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <AppHeader />
        <React.Fragment>{children}</React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  lightTheme: state.options.lightTheme
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    _.assign({}, optionsActions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

