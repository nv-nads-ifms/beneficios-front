import React from 'react';
import { TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

function CustomTextField(props) {
    const { id, error, onChangeHandler, type, onBlurHanler, fullWidth,
        ...others } = props;

    return (
        <TextField
            {...others}
            id={id}
            name={id}
            onChange={onChangeHandler}
            type={type}
            error={error != null ? !error.valido : false}
            helperText={error != null ? error.texto : ''}
            onBlur={onBlurHanler}

            InputLabelProps={{
                shrink: true,
            }}

            variant="outlined"
            margin="normal"
            fullWidth={fullWidth != null ? fullWidth : true}
        />
    );
}

CustomTextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default CustomTextField;