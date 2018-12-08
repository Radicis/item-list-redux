// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import ItemList from '../components/ItemList';
import ItemContents from '../components/ItemContents'
import * as itemActions from '../actions/items';
import CreateNewItem from '../dialogs/CreateItem';

type Props = {
  createNewItem: () => void,
  classes: {}
};

const styles = theme => ({
  mainContainer: {
    height: '100%'
  },
  title: {
    padding: '5px 10px',
    fontFamily: 'Roboto, sans-serif',
    background: '#424242',
    color: '#ccc',
    WebkitAppRegion: 'drag'
  },
  paper: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: 0
  },
  grid: {
    height: '100%',
    overflow: 'hidden'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class MainPage extends Component<Props> {
  props: Props;

  state = {
    dialogOpen: false
  };

  /**
   * Opens the create new dialog
   */
  openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  };

  /**
   * Closes the dialog
   */
  closeDialog = () => {
    this.setState({
      dialogOpen: false
    });
  };

  /**
   * Creates a new item in the store/state
   * @param itemName - string name
   */
  createNewItem = itemName => {
    const { createNewItem } = this.props;
    createNewItem(itemName);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;
    return (
      <div className={classes.mainContainer}>
        <div className={classes.title}>:The Thing Storerer: </div>
        <Paper className={classes.paper}>
          <Grid container spacing={24} className={classes.grid}>
            <Grid item xs={4}>
              <ItemList />
            </Grid>
            <Grid item xs={8}>
              <ItemContents />
            </Grid>
          </Grid>
          <CreateNewItem
            open={dialogOpen}
            handleOk={this.createNewItem}
            handleClose={this.closeDialog}
          />
          <Fab
            color="primary"
            onClick={this.openDialog}
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({}); // needs to be here although not used

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
