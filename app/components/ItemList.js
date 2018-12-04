// @flow
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import ItemListItem from './ItemListItem';
import * as itemActions from '../actions/items';

const styles = theme => ({
  list: {
    maxHeight: 420,
    overflowY: 'auto',
    overflowX: 'hiddden',
    marginRight: -20
  },
  search: {
    border: 0,
    margin: 10
  }
});

type Props = {
  items: array,
  selectItem: () => void,
  getItemsFromStore: () => void,
  removeItem: () => void
};

class ItemList extends Component<Props> {
  props: Props;

  state = {
     filterItems: []
  };

  componentWillMount() {
    const {
      getItemsFromStore
    } = this.props;
    getItemsFromStore();
    this.setState({
      filterItems: this.props.items,
    });
  }

  componentDidUpdate (prevProps) {
    const { items } = this.props;
    if (!_.isEqual(prevProps.items, items)) {
      this.setState({
        filterItems: items,
      });
    }
  }
  
  filterItems = (event) => {
    const { items } = this.props;
    this.setState({
      filterItems: _.filter(items, (i) => i.title.toUpperCase().includes(event.target.value.toUpperCase())),
    });
  };

  removeItem = (itemId) => {
    // show prompt
    const { removeItem } = this.props;
    removeItem(itemId);
  }

  render() {
    const {
      selectItem,
      removeItem,
      classes
    } = this.props;
    const {
      filterItems
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <TextField
            autoFocus
            className={classes.search}
            placeholder="Search.."
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={this.filterItems}
          />
        </Grid>
        <Grid item xs={12}>
          <List component="nav" className={classes.list}>
            {filterItems.map((item) => <ItemListItem key={item.id} item={item} selectItem={selectItem} removeItem={this.removeItem}/>)}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.items,
  itemCount: state.items.items.length
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ItemList));
