// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverSharp';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';

const styles = theme => ({
  item: {
    paddingLeft: 5,
    paddingRight: 5
  },
  deleteButton: {
    fontSize: 20,
    padding: 5,
    opacity: 0.6
  },
  avatar: {
    width: 30,
    height: 30,
    border: '1px solid #999'
  },
  avatarIcon: {
    fontSize: 20
  },
  typeText: {
    color: theme.palette.secondary.main,
    opacity: 0.6
  }
});

type Props = {
  item: object,
  selected: boolean,
  selectItem: () => void,
  removeItem: () => void,
  classes: object
};

const ItemListItem = (props: Props) => {
  const { classes, item, selectItem, removeItem, selected } = props;

  return (
    <ListItem
      button
      className={classes.item}
      selected={selected}
      onClick={() => selectItem(item)}
    >
      <Avatar className={classes.avatar}>
        {!item.type || item.type === 'text' ? (
          <TextFieldsIcon className={classes.avatarIcon} />
        ) : (
          <CodeIcon className={classes.avatarIcon} />
        )}
      </Avatar>
      <ListItemText
        primary={item.title}
        secondary={
          !item.type || item.type === 'text' ? (
            ''
          ) : (
            <React.Fragment>
              <span className={classes.typeText}>{item.type}</span>
            </React.Fragment>
          )
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => removeItem(item.id)}
          className={classes.deleteButton}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(ItemListItem);
