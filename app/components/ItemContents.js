// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Editor from './Editor';

type Props = {
  item: object,
  updateItem: () => void
};

export default class ItemContents extends Component<Props> {
  props: Props;

  state = {
    content: '',
    aceTheme: 'monokai',
    aceMode: 'mysql'
  };

  componentWillMount() {
    const { item } = this.props;
    this.setState({
      content: item.content
    });
  }

  /**
   * On update sync the local state content to that of the Ace editor
   */
  componentDidUpdate() {
    const { item } = this.props;
    const { content } = this.state;
    if (item && !_.isEqual(item.content, content)) {
      this.setState({
        content: content
      });
    }
  }

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
    const { content } = this.state;
    return (
      <Editor content={content} updateContent={this.updateContent} />
    );
  }
}