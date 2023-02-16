import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ListItemLink from '../ListItemLink/ListItemLink';

import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function MenuComponent(props) {
    const { menus, description } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const wrapper = React.createRef();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={description} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse ref={wrapper} in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menus.map((menu) => (
                        <ListItemLink
                            icon={<DescriptionIcon />}
                            to={menu.remotePath}
                            primary={menu.nome}
                            className={classes.nested}
                            key={menu.nome} />
                    ))}
                </List>
            </Collapse>
        </List>
    );
}