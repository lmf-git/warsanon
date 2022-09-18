import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';;
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import ShareIcon from '@material-ui/icons/Share';

import AccountHeader from './account-header';
import MobileMenu from './main-menu';

import SocialModal from '../layout/social/social-modal';
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  toolbarTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'black'
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: 'none'
  },
  logo: {
    userSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none'
  },
  shareIcon: {
    marginLeft: '0.5em'
  },
  overviewButton: {
    background: '#cb0d0f',
    color: '#fff5f4',
  }
}));


const gameMenuPages = [
  '/game/map', '/game/map/coordinate', '/game/overview', 
  '/game/manage/units', '/game/manage/items',
];


const Header = function(props) {
  const classes = useStyles();
  const router = useRouter()
  const [socialOpen, setSocialOpen] = React.useState(false);
  const toggleSocial = () => { setSocialOpen(true); }
  const isOverviewPage = () => { return router.pathname === '/game/overview'; }
  const showGameMenu = () => {
    return router.pathname.indexOf('game') !== -1;
  };

  return (
    <React.Fragment>
      <SocialModal open={socialOpen} setOpen={setSocialOpen}></SocialModal>

      <Container maxWidth="lg" id="page-header">
        <Toolbar className={classes.toolbar}>
          <MobileMenu {...props} />
          
          <Hidden mdDown>
            <Button variant="contained" size="small" color="secondary" onClick={toggleSocial} className={classes.shareIcon}>
              <ShareIcon />
              <Hidden smDown>SOCIAL</Hidden>
            </Button>
          </Hidden>

          <Link href="/">
            <a className={classes.toolbarLink + ' ' + classes.toolbarTitle + ' ' + classes.logo}>
              <img src="/static/logo.png" width={!showGameMenu() ? '100px' : '50px'} />
            </a>
          </Link>
          { !showGameMenu() ? <AccountHeader {...props} /> : null }
          { showGameMenu() ? <Link href={'/game/overview'}><a className={classes.toolbarLink}>
            <Button variant="contained" className={classes.overviewButton} disabled={isOverviewPage()}>
              <ViewModuleIcon />
              <Hidden smDown>
                OVERVIEW
              </Hidden>
            </Button></a></Link> : null 
          }
        </Toolbar>
        <Hidden xsDown>
          <Toolbar id="TESTING" component="nav" variant="dense" className={classes.toolbarSecondary}>
              <Link href={'/' + 'About'.toLowerCase()}>
                <a className={classes.toolbarLink}>
                  <Button>{'About'}</Button>
                </a>
              </Link>
              <Link href={'/' + 'Guide'.toLowerCase()}>
                <a className={classes.toolbarLink}>
                  <Button>{'Guide'}</Button>
                </a>
              </Link>
              <Link href={'/' + 'Statistics'.toLowerCase()}>
                <a className={classes.toolbarLink}>
                  <Button>{'Statistics'}</Button>
                </a>
              </Link>
              <Link href={'/' + 'Store'.toLowerCase()}>
                <a className={classes.toolbarLink}>
                  <Button>{'Store'}</Button>
                </a>
              </Link>
          </Toolbar>
        </Hidden>
      </Container>
    </React.Fragment>
  );
  
};

export default Header;