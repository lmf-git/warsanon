import React from 'react';
import Link from 'next/link';
import UserHelper from '../user/userHelper';
import AdminHelper from '../admin/helper';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      background: '#181818',
      boxShadow: 'none'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    listItemText: {
      color: 'white',
      textAlign: 'center',
      fontSize: '2em'
    },
    dialogContent: {
      background: '#3d3d3d',
      padding: 0,
    },
    menuList: {
      paddingTop: 0,
    },
    listItem: {
 
    },
    playItem: {
      background: '#224a92'
    }
  }),
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const GenerateListItem = (itemClass, textClass, clickHandler, href, label) => {
  return (
    <>
      <ListItem className={itemClass} button onClick={clickHandler}>
        <Link href={href}>
          <ListItemText className={textClass} primary={label} />
        </Link>
      </ListItem>
      <Divider />
    </>
  )
}

export default function Mobile(props) {
  const classes = useStyles();
  const itemClass = classes.listItem;
  const textClass = classes.listItemText;

  const [open, setOpen] = React.useState(false);
  function handleClickOpen() { setOpen(true); }
  function handleClose() { setOpen(false); }
  function signOut() { UserHelper.logOut(); setOpen(false); }

  const user = UserHelper.getFromPropsOrCookie(props);
  const isAdmin = AdminHelper.isAdmin(user);

  return (
    <div>
      <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
        <MenuIcon />
        <Hidden smDown>MENU</Hidden>
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.dialogContent}>
          <List className={classes.menuList}>
            { GenerateListItem(itemClass, textClass, handleClose, '/', 'Home') }

            { GenerateListItem(classes.playItem, textClass, handleClose, '/game/worlds', 'Play') }

            { isAdmin ? GenerateListItem(itemClass, textClass, handleClose, '/admin', 'Admin') : null }
            { GenerateListItem(itemClass, textClass, handleClose, '/guide', 'Guide') }
            { GenerateListItem(itemClass, textClass, handleClose, '/news', 'News') }
            { GenerateListItem(itemClass, textClass, handleClose, '/donate', 'Donate') }
            { !user ? GenerateListItem(itemClass, textClass, handleClose, '/account/login', 'Login') : null }
            { user ? GenerateListItem(itemClass, textClass, handleClose, '/account', 'Account') : null }

            { user ? 
              <>
                <ListItem className={classes.listItem} button color="danger" onClick={signOut} style={{ background: '#ff000070' }} >
                  <ListItemText className={classes.listItemText} style={{ color: 'white' }} primary="Sign out" />
                </ListItem>
                <Divider />
              </> : null
            }
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}