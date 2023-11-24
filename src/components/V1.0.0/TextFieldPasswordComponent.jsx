import React from "react";
import PropTypes from 'prop-types';

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

function TextFieldPasswordComponent(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                {props.label}
            </InputLabel>
            <OutlinedInput
                {...props}
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                // label={label}
            />
        </FormControl>
    );
}

TextFieldPasswordComponent.propTypes = {
    label: PropTypes.string.isRequired,
}

export default TextFieldPasswordComponent;