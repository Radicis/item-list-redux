// @flow
import * as React from 'react';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>{children}</React.Fragment>
      </MuiThemeProvider>
    );
  }
}
