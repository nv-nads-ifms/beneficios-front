import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

function PerfilSwitchPermissionComponent(props) {
    const { checked, rowId, name, onChangeStatus } = props;
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={(event) => onChangeStatus(event, rowId)}
                    name={name}
                    color="primary"
                    size="medium"
                />
            }
        />
    );
}

export default PerfilSwitchPermissionComponent;