import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getData } from "../../api/api";

const PAIS_API_BASE_URL = "/pais";

export default function Pais() {
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState({});

    React.useEffect(() => {
        getData(PAIS_API_BASE_URL)
            .then(r => r.json())
            .then(data => {
                setOptions(data.map((option) => option.nome));
            });
    }, []);

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-pais"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="País" variant="outlined" />}
            />
        </div>
    );
}