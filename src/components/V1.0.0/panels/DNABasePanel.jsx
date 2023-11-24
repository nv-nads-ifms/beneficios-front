import React from 'react';
import PropTypes from 'prop-types';
import { Container, Paper } from '@mui/material';

function DNABasePanel(props) {
    const { noconfig, children } = props;

    return (
        <Container 
            sx={{pt: '1em'}}
            style={props.style}
        >
            {noconfig==="true" ?
                (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                ) : (
                    <Paper
                        elevation={2}
                        sx={{
                            pt: 2, pb: 2,
                            pl: 5, pr: 5,
                            borderRadius: 5
                            // bgcolor: (theme) =>
                            //     theme.palette.mode === "dark" ? "#101010" : "grey.50",
                            // color: (theme) =>
                            //     theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                            // borderColor: (theme) =>
                            //     theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                        }}
                    >
                        {children}
                    </Paper>
                )}
        </Container>
    );
}

DNABasePanel.defaultPros = {
    noconfig: "false"
};

DNABasePanel.propTypes = {
    noconfig: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
};

export default DNABasePanel;