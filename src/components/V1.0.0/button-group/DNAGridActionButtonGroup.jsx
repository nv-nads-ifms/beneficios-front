import React from 'react';
import PropTypes from 'prop-types';
import DataService from '../../api/services/DataServices';
import { deleteModalMessage, showErrorMessages } from '../../api/utils/modalMessages';
import { ButtonGroup, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DNAGridActionButtonGroup(props) {
    const { datasourceUrl, row, callbackDelete, moreActions, onView, edit_func } = props;
    const dataService = new DataService(datasourceUrl);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            await deleteModalMessage(row.nome,
                () => dataService.delete(row.id),
                callbackDelete);
        } catch (error) {
            showErrorMessages(error);
        }
    };

    return (
        <ButtonGroup variant="outlined" aria-label="botões para a tabela">
            <Tooltip title="Abrir formulário para visualizar os dados deste registro">
                <IconButton aria-label="visualizar" onClick={(e) => onView(e, row)}>
                    <VisibilityIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Excluir os dados deste registro">
                <IconButton aria-label="excluir" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Abrir formulário de alteração dos dados deste registro">
                <IconButton aria-label="alterar" onClick={(e) => edit_func(e, row)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            {moreActions != null && (
                <React.Fragment>
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'more-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="more-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {moreActions.map((obj, index) => {
                            const { label, icon, handleClick } = obj;
                            return (
                                <MenuItem key={index} onClick={() => handleClick(row)}>
                                    {icon != null && (
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
                                    )}
                                    < ListItemText >
                                        {label}
                                    </ListItemText>
                                </MenuItem>
                            );

                        })}
                    </Menu>
                </React.Fragment>
            )}
        </ButtonGroup >
    );
}

DNAGridActionButtonGroup.propTypes ={
    datasourceUrl: PropTypes.string.isRequired, 
    row: PropTypes.object.isRequired, 
    callbackDelete: PropTypes.func.isRequired, 
    moreActions: PropTypes.arrayOf(PropTypes.exact({
        label: PropTypes.string.isRequired, 
        icon: PropTypes.element.isRequired, 
        handleClick: PropTypes.func.isRequired
      })), 
    onView: PropTypes.func.isRequired,
    edit_func: PropTypes.func.isRequired
}

export default DNAGridActionButtonGroup;