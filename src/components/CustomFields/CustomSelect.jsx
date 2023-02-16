import React from 'react';
import { FormControl, InputLabel, Select } from "@material-ui/core";

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//         id: 'population',
//         label: 'Population',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'size',
//         label: 'Size\u00a0(km\u00b2)',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'density',
//         label: 'Density',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toFixed(2),
//     },
// ];

function CustomSelect(props) {
    const { id, value, setValue, label, retrieveDataFunction,
        columns } = props;
    const [options, setOptions] = React.useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    React.useEffect(() => {
        retrieveDataFunction()
            .then(r => r.json())
            .then((data) => {
                setOptions(data);
            });
    }, [retrieveDataFunction, setOptions]);

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                native
                value={value}
                onChange={handleChange}
                inputProps={{
                    id: { id }
                }}
                displayEmpty={true}
                fullWidth
            // renderValue={(value) => { console.log(value) }}
            >
                <option aria-label="None" value="" />
                {options.map((option, key) => {
                    return (
                        <option key={key} value={option[columns.id]}>
                            {option[columns.label]}
                        </option>
                    );
                })}

            </Select>
        </FormControl>
    );
}

export default CustomSelect;