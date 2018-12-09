// @flow
import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  children: React.Node
};

class AppHeader extends Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <div>
        <AppBar position="sticky" color="default" style={{ WebkitAppRegion: 'drag'}}>
          <Toolbar variant="dense">
            <Typography variant="subtitle1">Thing Storerer!</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default AppHeader
