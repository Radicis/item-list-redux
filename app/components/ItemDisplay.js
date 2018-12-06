// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import _ from "lodash";

import 'brace/mode/mysql';
import 'brace/theme/monokai';

import * as itemActions from '../actions/items';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemDisplay extends Component<Props> {
  props: Props;

  state = {
    content: ''
  };

  /**
   * On update sync the local state content to that of the Ace editor
   */
  componentDidUpdate () {
    const { item } = this.props;
    const { content } = this.state;
    if (item && !_.isEqual(item.content, content)) {
      this.setState({
        content: item.content,
      });
    }
  }

  /**
   * Dispatch the item update action to update the item int he store and state
   * @param value - string value
   */
  updateContent = (value) => {
    const { updateItem, item } = this.props;
    const updatedItem = { content: value };
    updateItem(item.id,  updatedItem );
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
          fontSize={12}
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
    return <div/>
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
