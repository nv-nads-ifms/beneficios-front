import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import DataService from "../../api/services/DataServices";

export default function DNAAutocomplete(props) {
    const { path, input_label } = props;

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    
    const dataService = React.useMemo(() => {
        return new DataService(`/${path}`);
    }, [path]);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await dataService.getDataList();

            if (active) {
                if (response.hasOwnProperty('status') && response.status === 404) {
                    setOptions([]);
                } else {
                    setOptions(response.data);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, dataService]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}

            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={input_label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            {...props}
        />
    );
}