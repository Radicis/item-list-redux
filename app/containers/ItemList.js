// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import * as itemActions from '../actions/items';

import DeleteConfirm from '../dialogs/DeleteConfirm';
import ListFilter from '../components/ListFilter';
import ItemList from '../components/ItemList'

type Props = {
  items: array,
  selectItem: () => void,
  getItemsFromStore: () => void,
  removeItem: () => void
};

class ItemListContainer extends Component<Props> {
  props: Props;

  state = {
    filterItems: [],
    dialogOpen: false,
    itemId: null,
    types: [],
    filterType: 'all'
  };

  /**
   * On mount, get the items from the store and set the filter
   */
  componentWillMount() {
    const { getItemsFromStore, items } = this.props;
    getItemsFromStore();
    let types = _.compact(_.map(items, i => i.type));
    this.setState({
      filterItems: items,
      types
    });
  }

  /**
   * On update, update the filterItems
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (!_.isEqual(prevProps.items, items)) {
      console.log(_.compact(_.map(items, i => i.type)));
      this.setState({
        filterItems: items,
        types: _.compact(_.map(items, i => i.type))
      });
    }
  }

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
   * Filter the list items based on search
   * @param event
   */
  filterItems = event => {
    const { items } = this.props;
    const { filterType } = this.state;
    this.setState({
      filterItems: _.filter(items, i => {
        if (filterType === 'all' || !i.type) {
          return i.title.toUpperCase().includes(event.target.value.toUpperCase())
        }
        i.type === filterType && i.title.toUpperCase().includes(event.target.value.toUpperCase())       
      })
    });
  };

    /**
   * Filter the list items by type
   * @param event
   */
  filterItemsByType = event => {
    const { filterItems } = this.state;
    const type = event.target.value;
    this.setState({
      filterItems: _.filter(filterItems, i =>
        type === 'all' || i.type === type
      ),
      filterType: type
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
    const { filterItems, dialogOpen, itemId, types, filterType  } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <ListFilter types={types} filterType={filterType} filterItemsByType={this.filterItemsByType} filterItems={this.filterItems} />
        </Grid>
        <Grid item xs={12}>
          <ItemList
            items={filterItems}
            selectItem={selectItem}
            removeItem={this.openDeleteDialog}
          />
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
)(ItemListContainer);
