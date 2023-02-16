import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, Paper, TextField } from '@material-ui/core';
import AddIconButton from '../CustomIconButtons/AddIconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

function CustomAutoComplete(props) {
    const { retrieveDataFunction, label, placeholder, length,
        onChangeHandler, error, fullWidth, disabled, onBlurHandler,
        onShowInputModal,
        ...others } = props;
    const inputClasses = useStyles();
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        retrieveDataFunction()
            .then((r) => {
                const data = r.data;
                if (typeof (data) === 'string' && data === '')
                    setOptions(null);
                else
                    setOptions(data);
            });
    }, [retrieveDataFunction, setOptions, length]);

    return (
        <Paper elevation={0} className={inputClasses.root}>
            <Autocomplete
                onChange={onChangeHandler}
                options={options}

                fullWidth={fullWidth != null ? fullWidth : true}
                disabled={disabled != null ? disabled : false}
                onBlur={onBlurHandler}

                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        error={error != null ? !error.valido : null}
                        helperText={error != null ? error.texto : ''}
                        margin="normal" />}
                {...others}
            />
            {onShowInputModal != null && (
                <AddIconButton
                    disabled={disabled != null ? disabled : false}
                    tooltip="Adicionar uma nova opção"
                    onClick={onShowInputModal} />
            )}
        </Paper>
    );
}

CustomAutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    retrieveDataFunction: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default CustomAutoComplete;