import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, Typography, linearProgressClasses } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 25,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function LinearProgressWithLabelComponent(props) {
    
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%'
        }}>
            <Box sx={{
                width: '100%',
            }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box
                sx={{
                    width: 'inherit',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Typography variant="body2" color={'inherit'}>
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabelComponent.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabelComponent;