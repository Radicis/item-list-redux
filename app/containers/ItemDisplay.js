// @flow
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import * as itemActions from '../actions/items';

import ItemContents from '../components/ItemContents';
import ItemOptions from '../components/ItemOptions';

type Props = {
  item: object,
  updateItem: () => void,
  classes: object,
  lightTheme: boolean
};

const styles = () => ({
  fullHeight: {
    height: '100%',
    paddingBottom: '50px !important' // gets overwritten
  },
  fullHeightCollapsed: {
    paddingBottom: '30px  !important',
    paddingTop: '5px !important',
    height: '100%'
  },
  collapsed: {
    height: '0 !important'
  },
  collapseButton: {
    padding: '0 0 0 0 !important',
    marginRight: 10
  },
  noPadding: {
    margin: '5px 12px 0 0 !important',
    padding: '0 !important',
    flexGrow: 1
  },
  collapsedTitle: {
    marginLeft: 20
  },
  itemContents: {
    paddingBottom: '5px !important'
  },
  grow: {
    flexGrow: 1
  }
});

class ItemDisplayContainer extends Component<Props> {
  props: Props;

  state = {
    aceDarkTheme: 'monokai',
    aceLightTheme: 'github',
    collapsed: true
  };

  toggleCollapse = () => {
    const {collapsed} = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    const {classes, item, updateItem, lightTheme} = this.props;
    const {aceDarkTheme, aceLightTheme, collapsed} = this.state;
    if (!_.isEmpty(item)) {
      return (
        <Grid container spacing={24} direction="row" alignItems="stretch" className={classes.fullHeight}>
          {(collapsed) ?
            (<Grid item xs={12} className={classes.noPadding}>
              <Grid container>
                <Grid item className={classes.grow}>
                  <Typography variant="subtitle1" className={classes.collapsedTitle}>{item.title}</Typography>
                </Grid>
                <Grid item>
                  <IconButton color="default" onClick={this.toggleCollapse} className={classes.collapseButton}>
                    <ExpandMore/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>)

            :

            (<Grid item xs={12}>
              <Grid container>
                <Grid item className={classes.grow}>
                  <ItemOptions item={item} updateItem={updateItem}/>
                </Grid>
                <Grid item>
                  <IconButton color="default" onClick={this.toggleCollapse} className={classes.collapseButton}>
                    <ExpandLess/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>)
          }

          <Grid item className={(collapsed) ? classes.fullHeightCollapsed : classes.fullHeight} xs={12}>
            <ItemContents
              item={item}
              aceTheme={lightTheme ? aceLightTheme : aceDarkTheme}
              updateItem={updateItem}
            />
          </Grid>
        </Grid>
      );
    }
    return <div/>;
  }
}

const mapStateToProps = state => ({
  item: state.items.item,
  lightTheme: state.options.lightTheme
});

const mapDispatchToProps = dispatch => (bindActionCreators(itemActions, dispatch));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ItemDisplayContainer));
