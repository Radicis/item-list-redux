// @flow
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ItemList from '../components/ItemList';
import ItemDisplay from '../components/ItemDisplay';

type Props = {};

export default class MainPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Paper>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <ItemList/>
          </Grid>
          <Grid item xs={8}>
            <ItemDisplay/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
