import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

export default function DNATabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            role="tabpanel"
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}

            {...other}
        >
            {value === index && (
                <Paper sx={{
                    p: 3,
                    border: '1px',
                    borderColor: 'inherit'
                }}>
                    {children}
                </Paper>
            )}
        </div>
    );
}

DNATabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}