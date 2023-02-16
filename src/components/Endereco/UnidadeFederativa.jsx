import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getData } from "../../api/api";
const UF_API_BASE_URL = "/ufs";

export default function UnidadeFederativa() {
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState({});

    React.useEffect(() => {
        getData(UF_API_BASE_URL)
            .then(r => r.json())
            .then(data => {
                console.log(data);
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
                id="controllable-uf"
                options={options}
                clearOnBlur
                style={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="UF" variant="outlined" />}
            />
        </div>
    );
}