// @flow
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
  children: React.Node
};

export default class App extends Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>{children}</React.Fragment>
      </MuiThemeProvider>
    );
  }
}
