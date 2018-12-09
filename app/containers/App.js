// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import _ from 'lodash';

import AppHeader from '../components/AppHeader';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ffffff',
      main: '#e8eaf6',
      dark: '#b6b8c3',
      contrastText: '#000000'
    }
  }
});

type Props = {
  palette: object,
  children: React.Node
};

class App extends Component<Props> {
  props: Props;
  
  render() {
    const { palette, children, classes } = this.props;
    return (
      <MuiThemeProvider theme={_.assign({}, theme, palette)}>
        <AppHeader />
        <React.Fragment>{children}</React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  palette: state.options.palette
});

export default connect(
  mapStateToProps
)(App);

