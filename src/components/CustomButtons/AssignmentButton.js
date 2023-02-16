import React from 'react';
import { Button, Tooltip } from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function AssignmentButton(props) {
    const { tooltip, label } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Avaliar"}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AssignmentIcon />}
                {...props}
            >
                {label}
            </Button>
        </Tooltip>
    );
}