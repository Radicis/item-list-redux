// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import * as itemActions from '../actions/items';

import DeleteConfirm from '../dialogs/DeleteConfirm';
import ListFilter from '../components/ListFilter';
import ItemList from '../components/ItemList';

const styles = () => ({
  fullHeight: {
    height: '100%'
  },
  overflowScroll: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingBottom: '100px !important' // gets overwritten
  }
});

type Props = {
  items: array,
  item: object,
  selectItem: () => void,
  getItemsFromStore: () => void,
  removeItem: () => void,
  classes: object
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
    this.setState({
      filterItems: items,
      types: _.compact(_.map(items, i => i.type))
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
    const filterEvent = event.target.value;

    const filteredItems = _.filter(
      items,
      i => filterType === 'all' || i.type === filterType
    );

    this.setState({
      filterItems: filterEvent
        ? _.filter(filteredItems, i =>
            i.title.toUpperCase().includes(filterEvent.toUpperCase())
          )
        : filteredItems
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
      filterItems: _.filter(
        filterItems,
        i => type === 'all' || i.type === type
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

  resetFilters = () => {
    const { items } = this.props;
    this.setState({
      filterItems: items,
      filterType: 'all'
    });
  };

  render() {
    const { selectItem, classes, item, items } = this.props;
    const { filterItems, dialogOpen, itemId, types, filterType } = this.state;
    return (
      <Grid container direction="row" alignItems="stretch" spacing={16} className={classes.fullHeight}>
        <Grid item xs={12}>
          <ListFilter
            types={_.uniq(types)}
            filterType={filterType}
            filterItemsByType={this.filterItemsByType}
            isFiltered={filterItems.length !== items.length}
            resetFilters={this.resetFilters}
            filterItems={this.filterItems}
          />
        </Grid>
        <Grid item className={classes.overflowScroll} xs={12}>
          <ItemList
            items={filterItems}
            selectedItemId={item ? item.id : 0}
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
  items: state.items.items,
  item: state.items.item
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ItemListContainer));
