import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { userContext } from '../../hooks/userContext';
import { List } from '@material-ui/core';
import ListItemLink from '../../components/ListItemLink/ListItemLink';
import MenuComponent from '../../components/Menu/MenuComponent';
import UserView from './UserView';
import { getCurrentUser, logout } from '../../api/services/auth';

import DataService from '../../api/services/DataServices';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const getMenus = (tipo, usuario) => {
  let value = usuario instanceof Object && Array.isArray(usuario.perfis);
  if (value) {
    let lista = usuario.perfis.map(perfil => ({
      ...perfil,
      menus: perfil.menus.filter(menu => menu.tipo === tipo && menu.ler)
    }));
    return lista[0].menus;
  }
  return value;
}

const dataService = new DataService('/usuarios');

function Menus(props) {
  const { window, children } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [usuario, setUsuario] = React.useState({});
  const localUserData = getCurrentUser();

  React.useEffect(() => {
    if (localUserData !== null) {
      dataService.getFilter('/email', {email: localUserData})
        .then(response => {
          setUsuario(response.data);
        })
        .catch(error => {
          logout();
          navigate('/login');
        });
    } else {
      dataService.getBy('auth/logout')
        .then(response => logout());
    }
  }, [localUserData, navigate]);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuAdmin = getMenus('ADMIN', usuario);
  const menuAtendimento = getMenus('ATENDIMENTO', usuario);
  const menuCadastro = getMenus('CADASTRO', usuario);
  const menuAnalise = getMenus('ANALISE', usuario);
  const menuEstoque = getMenus('ESTOQUE', usuario);
  const menuLocalizacao = getMenus('LOCALIZACAO', usuario);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <UserView usuario={usuario} />
      </div>
      <List component="div" disablePadding>
        <ListItemLink
          to='/home'
          primary='Home'
          className={classes.nested}
          icon={<HomeIcon />} />
      </List>
      {menuAdmin.length > 0 && (
        <div>
          <MenuComponent menus={menuAdmin} description="Administração" />
        </div>
      )}
      {menuAtendimento.length > 0 && (
        <div>
          <MenuComponent menus={menuAtendimento} description="Atendimentos" />
        </div>
      )}
      {menuAnalise.length > 0 && (
        <div>
          <MenuComponent menus={menuAnalise} description="Analises" />
        </div>
      )}
      {menuEstoque.length > 0 && (
        <div>
          <MenuComponent menus={menuEstoque} description="Estoque" />
        </div>
      )}
      {menuCadastro.length > 0 && (
        <div>
          <MenuComponent menus={menuCadastro} description="Cadastros" />
        </div>
      )}
      {menuLocalizacao.length > 0 && (
        <div>
          <MenuComponent menus={menuLocalizacao} description="Localização" />
        </div>
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Gestão de Benefícios Eventuais
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <userContext.Provider value={usuario}>
          {children}
        </userContext.Provider>
      </main>
    </div>
  );
}

Menus.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Menus;
