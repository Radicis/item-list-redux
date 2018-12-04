// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {bindActionCreators} from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import ItemList from '../components/ItemList';
import ItemDisplay from '../components/ItemDisplay';
import * as itemActions from '../actions/items';
import CreateNewItem from '../dialogs/CreateItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

type Props = {
  createNewItem: () => void
};

const styles = theme => ({
  paper: {
    height: "100%",
    overflow: 'hidden'
  },
  grid: {
    height: "100%",
    overflow: 'hidden'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class MainPage extends Component<Props> {
  props: Props;

  state = {
    dialogOpen: false,
 };

  openDialog = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  createNewItem = (itemName) => {
    const { createNewItem } = this.props;
    createNewItem(itemName);
    this.closeDialog();
  }

  render() {
    const { classes, createNewItem } = this.props;
    const { dialogOpen } = this.state;
    return (
      <div class="main-container">
      <div class="title">The Thing Storerer!</div>
      <Paper className={classes.paper}>
        <Grid container spacing={24} className={classes.grid}>
          <Grid item xs={4}>
            <ItemList/>
          </Grid>
          <Grid item xs={8}>
            <ItemDisplay/>
          </Grid>
        </Grid>
        <CreateNewItem open={dialogOpen} handleOk={this.createNewItem} handleClose={this.closeDialog}/>
        <Fab color="primary" onClick={this.openDialog} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));