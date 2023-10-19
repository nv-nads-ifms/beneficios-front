import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {
  ClickAwayListener,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ListItemIcon,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

import { popperModifiers } from "./menu-constants";

function DNAMenu(props) {
  const { caption, menuData, submenu } = props;
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClick = (event, menu) => {
    if (menu.hasOwnProperty("url")) {
      navigate(`/${menu.url}`, { replace: true });
    }

    handleClose(event);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      {caption != null ? (
        <List>
          <ListItemButton
            ref={anchorRef}
            onClick={handleToggle}
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
          >
            <ListItemText
              primary={
                <Typography variant="overline">
                  {caption}
                </Typography>
              } />
            {menuData.length > 0 && (
              submenu != null ? (
                <ChevronRightIcon />
              ) : open ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )
            )}

          </ListItemButton>
        </List>
      ) : (
        <IconButton
          size="large"
          ref={anchorRef}
          aria-label="account of current user"
          aria-controls={open ? "menu-appbar" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        disablePortal
        transition
        sx={{ zIndex: 100 }}
        placement={submenu != null ? "right-start" : "bottom-start"}
        modifiers={popperModifiers}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocus={open}
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {menuData != null && Object.entries(menuData).map(([index, menu]) => {
                    if (menu.hasOwnProperty("submenus")) {
                      return (
                        <DNAMenu
                          key={index}
                          caption={menu.caption}
                          menuData={menu.submenus}
                          submenu
                        />
                      );
                    }
                    return (
                      <MenuItem
                        key={index}
                        onClick={(event) => handleClick(event, menu)}
                      >
                        {menu.hasOwnProperty('icon') && (
                          <ListItemIcon>
                            {menu.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText>
                          {menu.caption}
                        </ListItemText>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

DNAMenu.propTypes = {
  caption: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.object).isRequired,
  submenu: PropTypes.arrayOf(PropTypes.object),
};
export default DNAMenu;