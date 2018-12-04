// @flow
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import ItemListItem from './ItemListItem';
import * as itemActions from '../actions/items';

import CreateNewItem from '../dialogs/CreateItem';

type Props = {
  items: array,
  selectItem: () => void,
  getItemsFromStore: () => void,
  removeItem: () => void,
  createNewItem: () => void
};

class ItemList extends Component<Props> {
  props: Props;

  state = {
     dialogOpen: false,
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

  filterItems = (event) => {
    const { items } = this.props;
    this.setState({
      filterItems: _.filter(items, (i) => i.title.toUpperCase().includes(event.target.value.toUpperCase())),
    });
  };

  render() {
    const {
      selectItem,
      removeItem,
      createNewItem
    } = this.props;
    const {
      dialogOpen,
      filterItems
    } = this.state;
    return (
      <div>
      <Grid container>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={this.openDialog}>Create New</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            id="outlined-full-width"
            style={{ margin: 8 }}
            placeholder="Search"
            fullWidth
            margin="normal"
            onChange={this.filterItems}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <List component="nav">
            {filterItems.map((item) => <ItemListItem key={item.id} item={item} selectItem={selectItem} removeItem={removeItem}/>)}
          </List>
        </Grid>
      </Grid>
        <CreateNewItem open={dialogOpen} handleOk={createNewItem} handleClose={this.closeDialog}/>
      </div>
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
)(ItemList);
