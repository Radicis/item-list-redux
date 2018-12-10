// @flow
import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const AppHeader = () => {
    return (
      <div>
        <AppBar position="sticky" color="default" style={{ WebkitAppRegion: 'drag'}}>
          <Toolbar variant="dense">
            <Typography variant="subtitle1">Thing Storerer!</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
};

export default AppHeader
