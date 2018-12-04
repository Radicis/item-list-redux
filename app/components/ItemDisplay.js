// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

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
    if (item && !_.isEqual(item.content, content)) {
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
    updateItemContent(item.id, value);
  };

  render() {
    const { item } = this.props;
    const { content } = this.state;
    if (item) {
    return (
          <AceEditor
            mode="mysql"
            theme="monokai"
            name="query"
            fontSize={14}
            showPrintMargin={false}
            showGutter
            width="100%"
            height="100%"
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
    );
          }
          return <div></div>
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
