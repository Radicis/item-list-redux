// @flow
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

type Props = {
  content: string,
  updateContent: () => void
};

const Editor = (props: Props) => {
  const { content, updateContent } = props;
  return (
    <AceEditor
      mode="mysql"
      theme="monokai"
      name="contents"
      fontSize={12}
      showPrintMargin={false}
      showGutter
      width="100%"
      height="100%"
      highlightActiveLine
      value={content}
      onChange={updateContent}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  );
};

export default Editor;
