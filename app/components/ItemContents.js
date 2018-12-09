// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Editor from './Editor';

type Props = {
  item: object,
  updateItem: () => void
};

class ItemContents extends Component<Props> {
  props: Props;

  state = {
    content: '',
    aceTheme: 'monokai',
    aceMode: 'text'
  };

  /**
   * Dispatch the item update action to update the item int he store and state
   * @param value - string value
   */
  updateContent = value => {
    const { updateItem, item } = this.props;
    const updatedItem = { content: value };
    updateItem(item.id, updatedItem);
  };

  render() {
    const { classes, item, aceTheme } = this.props;
    const { content } = this.state;
    return (
      <Editor
        content={item.content}
        aceMode={item.type}
        updateContent={this.updateContent}
      />
    );
  }
}

export default ItemContents;
