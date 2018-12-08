// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import ItemListItem from './ItemListItem';
import * as itemActions from '../actions/items';
import DeleteConfirm from '../dialogs/DeleteConfirm';
import ListFilter from './ListFilter';

const styles = () => ({
  list: {
    height: 440,
    overflowY: 'auto',
    overflowX: 'hidden',
    marginRight: -20
  }
});

type Props = {
  items: array,
  selectItem: () => void,
  getItemsFromStore: () => void,
  removeItem: () => void,
  classes: {}
};

class ItemList extends Component<Props> {
  props: Props;

  state = {
    filterItems: [],
    dialogOpen: false,
    itemId: null
  };

  /**
   * On mount, get the items from the store and set the filter
   */
  componentWillMount() {
    const { getItemsFromStore, items } = this.props;
    getItemsFromStore();
    this.setState({
      filterItems: items
    });
  }

  /**
   * On update, update the filterItems
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (!_.isEqual(prevProps.items, items)) {
      this.setState({
        filterItems: items
      });
    }
  }

  /**
   * Filter the list items based on search
   * @param event
   */
  filterItems = event => {
    const { items } = this.props;
    this.setState({
      filterItems: _.filter(items, i =>
        i.title.toUpperCase().includes(event.target.value.toUpperCase())
      )
    });
  };

  /**
   * Displays the delete dialog
   * @param itemId
   */
  openDeleteDialog = itemId => {
    this.setState({
      dialogOpen: true,
      itemId
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
   * Removes the item from the store and state
   * @param itemId
   */
  removeItem = itemId => {
    const { removeItem } = this.props;
    removeItem(itemId);
    this.closeDialog();
  };

  render() {
    const { selectItem, classes } = this.props;
    const { filterItems, dialogOpen, itemId } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <ListFilter filterItems={this.filterItems} />
        </Grid>
        <Grid item xs={12}>
          <List component="nav" className={classes.list} dense>
            {filterItems.map(item => (
              <ItemListItem
                key={item.id}
                item={item}
                selectItem={selectItem}
                removeItem={() => this.openDeleteDialog(item.id)}
              />
            ))}
          </List>
        </Grid>
        <DeleteConfirm
          open={dialogOpen}
          itemId={itemId}
          handleOk={this.removeItem}
          handleClose={this.closeDialog}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.items
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ItemList));
