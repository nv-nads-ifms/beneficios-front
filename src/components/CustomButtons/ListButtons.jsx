import React from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Setttings from "@material-ui/icons/Settings";
import BlockIconButton from '../../components/CustomIconButtons/BlockIconButton';
import CheckIconButton from '../../components/CustomIconButtons/CheckIconButton';
import RestoreIconButton from '../../components/CustomIconButtons/RestoreIconButton';

import { ButtonGroup, IconButton } from '@mui/material';


export const ButtonType = {
    VIEW: "VIEW",
    EDIT: "EDIT",
    DELETE: "DELETE",
    SELECT: "SELECT",
    GENERATOR: "GENERATOR",
    RESTORE: "RESTORE",
    ACTIVATE: "ACTIVATE",
    DEACTIVATE: "DEACTIVATE",
}

export const ButtonInfo = {
    label: '',
    type: ButtonType.VIEW,
    action: () => { },
};

export default function ListButton(props) {
    const { buttons } = props;

    return (
        <ButtonGroup variant="outlined">
            {buttons.map(button => {
                let icon, color;
                switch (button.type) {
                    case ButtonType.VIEW:
                        icon = <VisibilityIcon />;
                        color = "primary";
                        break;
                    case ButtonType.EDIT:
                        icon = <ModeEditOutlinedIcon />
                        color = "warning";
                        break;
                    case ButtonType.DELETE:
                        icon = <DeleteOutlineIcon />
                        color = "error";
                        break;
                    case ButtonType.SELECT:
                        icon = <CheckIcon />
                        color = "success";
                        break;
                    case ButtonType.GENERATOR:
                        icon = <Setttings />
                        color = "primary";
                        break;
                    case ButtonType.RESTORE:
                        icon = <RestoreIconButton />
                        color = "default";
                        break;
                    case ButtonType.ACTIVATE:
                        icon = <CheckIconButton />
                        color = "success";
                        break;
                    case ButtonType.DEACTIVATE:
                        icon = <BlockIconButton />
                        color = "error";
                        break;
                    default: return button;
                }
                return (
                    <IconButton
                        color={color}
                        onClick={button.action}
                    >
                        {icon}
                    </IconButton>
                );
            })}
        </ButtonGroup>
    );
}