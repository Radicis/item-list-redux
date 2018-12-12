// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ItemListContainer from './ItemList';
import ItemDisplayContainer from './ItemDisplay';

type Props = {
  classes: object,
  menuCollapsed: boolean
};

const styles = theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing.unit * 2,
    overflow: 'hidden',
    borderRadius: 0
  },
  fullHeight: {
    height: '100%',
    overflow: 'hidden'
  }
});

class MainPage extends Component<Props> {
  render() {
    const {classes, menuCollapsed} = this.props;
    return (
      <Paper className={classes.mainContainer}>

        {(menuCollapsed)
          ?

          (
            <Grid
              container
              spacing={24}
              alignItems="stretch"
              className={classes.fullHeight}
            ><Grid item xs={12}><ItemDisplayContainer/></Grid></Grid>
          )

          :

          (<Grid
              container
              spacing={24}
              alignItems="stretch"
              className={classes.fullHeight}
            >
              <Grid item xs={4}>
                <ItemListContainer/>
              </Grid>

              <Grid item xs={8}>
                <ItemDisplayContainer/>
              </Grid>
            </Grid>

          )}
      </Paper>);
  }
};

const mapStateToProps = state => ({
  menuCollapsed: state.options.menuCollapsed
});

export default connect(
  mapStateToProps
)(withStyles(styles)(MainPage));
