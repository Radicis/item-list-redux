// @flow
import React, { Component } from 'react';
import Editor from './Editor';

type Props = {
  item: object,
  updateItem: () => void,
  aceTheme: string
};

class ItemContents extends Component<Props> {
  props: Props;

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
    const { item, aceTheme } = this.props;
    return (
      <Editor
        content={item.content}
        aceMode={item.type}
        aceTheme={aceTheme}
        updateContent={this.updateContent}
      />
    );
  }
}

export default ItemContents;
