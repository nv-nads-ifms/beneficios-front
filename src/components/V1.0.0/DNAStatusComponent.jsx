import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

import WarningIcon from '@mui/icons-material/Warning';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import BlockIcon from '@mui/icons-material/Block';

import { StatusType } from '../../api/utils/constants';

const getStatusParam = (status) => {
    switch (status) {
        case StatusType.PENDENTE: return { color: 'warning', icon: <WarningIcon /> };
        case StatusType.INATIVO: return { color: 'disabled', icon: <PersonOffIcon /> };
        case StatusType.ATIVO: return { color: 'success', icon: <HowToRegIcon /> };
        default: return { color: 'error', icon: <BlockIcon /> };
    }
}

function DNAStatusComponent(props) {
    const { status } = props;
    const { color, icon } = getStatusParam(status);

    return (
        <Chip
            sx={{
                pl: 2,
                pr: 2,
                pt: 4,
                pb: 4,
            }}
            label={status}
            color={color}
            variant='contained'
            icon={icon}
            {...props}
        />
    );
}

DNAStatusComponent.propTypes ={
    status: PropTypes.oneOf([
        StatusType.PENDENTE, 
        StatusType.INATIVO, 
        StatusType.ATIVO,
        StatusType.BLOQUEADO])
}

export default DNAStatusComponent;