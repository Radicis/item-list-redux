// @flow
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import _ from 'lodash';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemDisplayContents extends Component<Props> {
  props: Props;

  state = {
    content: '',
    aceTheme: 'monokai',
    aceMode: 'mysql'
  };

  /**
   * On update sync the local state content to that of the Ace editor
   */
  componentDidUpdate() {
    const { item } = this.props;
    const { content } = this.state;
    if (item && !_.isEqual(item.content, content)) {
      this.setState({
        content: item.content
      });
    }
  }

  render() {
    const { item } = this.props;
    const { content, aceTheme, aceMode } = this.state;
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
          tabSize: 2
        }}
        />
    );
  }
}

export default ItemDisplayContents;
