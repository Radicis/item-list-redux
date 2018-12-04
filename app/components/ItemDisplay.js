// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

import * as itemActions from '../actions/items';
import _ from "lodash";

type Props = {
  item: object,
  updateItemContent: () => void
};

class ItemDisplay extends Component<Props> {
  props: Props;

  state = {
    timer: null,
    content: ''
  };

  componentDidUpdate () {
    const { item } = this.props;
    const { content } = this.state;
    if (!_.isEqual(item.content, content)) {
      this.setState({
        content: item.content,
      });
    }
  }

  updateContent = (value) => {
    const { timer } = this.state;
    if(timer) {
      clearTimeout(timer);
    }
    const { updateItemContent, item } = this.props;
    // this.setState({
    //   timer: setTimeout(() => {updateItemContent(item.id, value)}, 1000)
    // });
    updateItemContent(item.id, value);
  };

  render() {
    const { item } = this.props;
    const { content } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="title" gutterBottom>
            { item.title }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AceEditor
            mode="mysql"
            theme="monokai"
            name="query"
            fontSize={12}
            showPrintMargin={false}
            showGutter
            width="100%"
            height="500px"
            highlightActiveLine
            value={content}
            onChange={this.updateContent}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return {
    item: state.items.item
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(itemActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDisplay);
