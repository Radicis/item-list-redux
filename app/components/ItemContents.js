// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Editor from './Editor';

type Props = {
  item: object,
  updateItem: () => void,
  aceTheme: string
};

class ItemContents extends Component<Props> {
  props: Props;

  state = {
    content: ''
  };

  /**
   * On mount, set the local state content
   */
  componentWillMount() {
    const { item } = this.props;
    this.setState({
      content: item.content
    });
  }

  /**
   * On mount, set the local state content
   */
  componentDidUpdate(prevProps) {
    const { item } = this.props;
    if (!_.isEqual(item, prevProps.item)) {
      this.setState({
        content: item.content
      });
    }
  }

  /**
   * Dispatch the item update action to update the item int he store and state
   * @param value - string value
   */
  updateContent = value => {
    const self = this;
    const { updateItem, item } = this.props;
    const updatedItem = { content: value };
    clearTimeout(self.timer);
    self.setState({
      content: value
    });
    self.timer = setTimeout(() => {
      updateItem(item.id, updatedItem);
    }, 500);
  };

  render() {
    const { item, aceTheme } = this.props;
    const { content } = this.state;
    return (
      <Editor
        content={content}
        aceMode={item.type}
        aceTheme={aceTheme}
        updateContent={this.updateContent}
      />
    );
  }
}

export default ItemContents;
